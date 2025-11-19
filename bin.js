#!/usr/bin/env node

const Canary = require('./')
const { command, summary, flag, rest } = require('paparam')
const os = require('os')
const path = require('path')
const graceful = require('graceful-goodbye')

const run = command(
  'holepunch-canary',
  summary('Runs all tests in a list of repos to see if something broke'),
  flag('--overwrite|-o <module-name=./path>', 'Overwrite a module to a local folder, to check if you broke anything'),
  flag('--detailed', 'Enable detailed output of failing tests (defaults to just the title)'),
  flag('--config <repo_to_clone/repos.json>', 'Link to a file in a github repository where the config lives. (e.g. holepunchto/canary-tests/repos.json)'),
  rest('additional repos (use --config to use a default list)'),
  async () => {
    const tmp = os.tmpdir()

    const accessToken = process.env.CANARY_PAT
    const detailed = run.flags.detailed === true

    const c = new Canary(
      path.join(tmp, 'holepunch-canary'),
      { accessToken }
    )

    graceful(() => c.destroy())

    const repos = []
    if (run.flags.config) {
      // DEVNOTE: currently, only top-level files are supported
      // If you want to support a file at /config/config.json, change this code
      const config = run.flags.config
      const configStartChar = config.lastIndexOf('/')
      const gitRepo = config.slice(0, configStartChar)
      const reposJsonLoc = config.slice(configStartChar)
      console.log(`Loading config file from git repo ${gitRepo}`)
      for (const repo of await c.getJsonFromRepo(gitRepo, reposJsonLoc)) {
        repos.push(repo)
      }
    }
    if (run.rest) {
      for (const repo of run.rest) repos.push({ name: repo, branches: ['main'] })
    }

    if (repos.length === 0) {
      console.error('No repositories were specified. Either specify 1 or more repositories directly, or use the --config option')
      process.exit(1)
    }

    if (run.flags.overwrite) {
      for (const o of run.flags.overwrite.split(',')) {
        const [name, folder] = o.split('=').map(s => s.trim())
        if (!name || !folder) continue
        c.overwrite(name, folder)
      }
    }

    let exit = 0
    for (const repo of repos) {
      for (const branch of repo.branches) {
        console.log(`Testing ${repo.name}#${branch}`)
        await test(repo, branch)
      }
    }

    console.log('\n\n--- Canary Test Summary ---\n\n')
    console.log(`Tested ${repos.length} repositories`)
    console.log(c.getFailureSummary({ detailed }))
    console.log('\n\n--- End of Summary ---\n\n')

    process.exit(exit)

    async function test (repo, branch) {
      const res = await c.test(repo, branch)
      if (res.failed) exit = 1
    }
  }
)

run.parse()

const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const Result = require('./lib/result')

module.exports = class CanaryRunner {
  constructor (dir, { accessToken } = {}) {
    this.dir = dir
    this.overwrites = new Map()
    this.log = true
    this.runs = 0
    this.activeProcesses = new Set()
    this.result = new Result()

    this.accessToken = accessToken || null
  }

  getFailureSummary ({ detailed = false } = {}) {
    return this.result.getSummary({ detailed })
  }

  overwrite (name, dir) {
    this.overwrites.set(name, path.resolve(dir))
  }

  async destroy () {
    for (const proc of this.activeProcesses) {
      const exiting = new Promise(resolve => proc.on('exit', resolve))
      proc.kill('SIGKILL')
      await exiting
    }
  }

  async test (repoInfo) {
    const gitRepo = this._normalizeGitRepo(repoInfo.name)
    const scripts = ['test', ...(repoInfo.additionalNpmScripts || [])]
    const folder = path.join(this.dir, '' + (++this.runs) + '-' + Math.random().toString(16).slice(2))

    await rm(folder)
    await mkdir(folder)

    const baseResult = {
      repo: repoInfo.name
    }

    let result = null

    try {
      result = await this._run(folder, 'git', 'clone', gitRepo, 'repo')
      if (result.code !== 0) {
        const runOverview = {
          ...baseResult,
          step: 'clone',
          failed: true,
          code: result.code,
          stdout: result.stdout,
          stderr: result.stderr
        }

        result.add(runOverview)

        return runOverview
      }

      const repo = path.join(folder, 'repo')

      result = await this._run(repo, 'git', 'rev-parse', 'HEAD')
      if (result.code !== 0) {
        const runOverview = {
          ...baseResult,
          step: 'get-git-commit-hash',
          failed: true,
          code: result.code,
          stdout: result.stdout,
          stderr: result.stderr
        }

        result.add(runOverview)
        return runOverview
      }

      baseResult.gitHash = result.stdout.trim()

      result = await this._run(repo, 'npm', 'install')
      if (result.code !== 0) {
        const runOverview = {
          ...baseResult,
          step: 'npm-install',
          failed: true,
          code: result.code,
          stdout: result.stdout,
          stderr: result.stderr
        }

        result.add(runOverview)

        return runOverview
      }

      for (const [name, folder] of this.overwrites) {
        if (this.log) console.log('Injecting', folder, 'as', name)
        const nm = path.join(repo, 'node_modules', name)
        await rm(nm)
        try {
          await fs.promises.symlink(folder, nm)
        } catch {}
      }

      let runOverview = null
      for (const script of scripts) {
        result = await this._run(repo, 'npm', 'run', script)

        runOverview = {
          ...baseResult,
          step: `npm-run-${script}`,
          failed: result.code !== 0,
          code: result.code,
          stdout: result.stdout,
          stderr: result.stderr
        }

        this.result.add(runOverview)

        // Bail on first failure
        if (runOverview.failed) return runOverview
      }

      return runOverview
    } finally {
      await rm(folder)
    }
  }

  async getJsonFromRepo (repo, location) {
    repo = this._normalizeGitRepo(repo)

    const folder = path.join(this.dir, 'repo-with-config')

    await rm(folder)
    await mkdir(folder)

    const result = await this._run(folder, 'git', 'clone', repo, 'repo')
    if (result.failed) throw new Error('Could not clone repo where the config lives')

    const file = await fs.promises.readFile(path.join(folder, 'repo', location))
    const repos = JSON.parse(file)

    const res = []
    for (const [name, extraInfo] of Object.entries(repos)) {
      res.push({
        name,
        additionalNpmScripts: Array.from(extraInfo.additionalNpmScripts || [])
      })
    }

    return res
  }

  async _run (dir, program, ...args) {
    const proc = spawn(program, [...args], {
      cwd: dir,
      env: {
        BRITTLE_COVERAGE: 'false',
        ...process.env
      }
    })

    this.activeProcesses.add(proc)

    const result = {
      code: 0,
      stdout: '',
      stderr: ''
    }

    proc.stdout.setEncoding('utf-8')
    proc.stdout.on('data', (data) => {
      result.stdout += data
      if (this.log) process.stdout.write(data)
    })

    proc.stderr.setEncoding('utf-8')
    proc.stderr.on('data', (data) => {
      result.stderr += data
      if (this.log) process.stderr.write(data)
    })

    return new Promise(resolve => {
      proc.on('exit', (code) => {
        this.activeProcesses.delete(proc)
        result.code = code
        resolve(result)
      })
    })
  }

  _normalizeGitRepo (gitRepo) {
    if (gitRepo.indexOf('@') !== -1 || gitRepo.indexOf('://') !== -1) {
      return gitRepo
    }

    return this.accessToken
      ? `https://${this.accessToken}@github.com/${gitRepo}.git`
      : 'git@github.com:' + gitRepo
  }
}

async function rm (dir) {
  try {
    await fs.promises.rm(dir, { recursive: true })
  } catch {}
}

async function mkdir (dir) {
  try {
    await fs.promises.mkdir(dir, { recursive: true })
  } catch {}
}

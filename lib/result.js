class Result {
  constructor () {
    this.failuresPerRepo = new Map()
    this.reposWithFailuresBeforeTests = new Map()
  }

  addFailureBeforeTest (runOverview) {
    const repoName = runOverview.repoName
    const gitHash = runOverview.gitHash
    this.reposWithFailuresBeforeTests.set(
      repoName, `${repoName} had an unexpected failure during preliminary step '${runOverview.step}'\nCommit hash: ${gitHash}\n\n${runOverview.stderr}\n`
    )
  }

  add (runOverview) {
    if (!runOverview.failed) return
    if (!runOverview.step.includes('npm-run')) {
      this.addFailureBeforeTest(runOverview)
      return
    }

    const failingTests = []

    const [preamble, allTestsRaw] = runOverview.stdout.split(
      /TAP version [0-9]+/
    )

    const repoInfo = `${preamble.trim().split('\n')[0]} (commit hash ${runOverview.gitHash})`
    const allTests = allTestsRaw.split(/\n\n#/)
    const failingTestEndFinder = /not ok [0-9]+ .+ # time = /
    for (const testOutput of allTests) {
      if (failingTestEndFinder.test(testOutput)) {
        const title = testOutput.split('\n').slice(-1)[0]
        failingTests.push({
          title,
          testOutput,
          gitHash: runOverview.gitHash
        })
      }
    }

    // An error stops the test run.
    // As a 'try our best' hack, we link the error with
    // the last test, but that is not guaranteed to be true
    // (for example if an unhandled rejection triggers from a previous test)
    if (runOverview.stderr) {
      const erroredTest = allTests[allTests.length - 1]
      const title = `[TEST ERROR] ${erroredTest.trim().split('\n')[0]}`
      const testOutput = `${erroredTest}\n${runOverview.stderr}`

      failingTests.push({
        title,
        testOutput
      })
    }

    this.failuresPerRepo.set(repoInfo, failingTests)
  }

  getSummary ({ detailed = false } = {}) {
    const res = []
    res.push(`${this.failuresPerRepo.size + this.reposWithFailuresBeforeTests.size} repositories with failures\n`)

    for (const [repoName, failingTests] of this.failuresPerRepo) {
      res.push(repoName)

      if (failingTests.length === 0) {
        res.push('WARNING: could not extract failing tests (probably a missing case in the canary repository)')
        continue
      }

      for (const t of failingTests) {
        if (detailed) {
          res.push(t.testOutput)
        } else {
          res.push(`  - ${t.title}`)
        }
      }
    }

    for (const msg of this.reposWithFailuresBeforeTests.values()) {
      res.push(msg)
    }

    return res.join('\n')
  }
}

module.exports = Result

const t = require('brittle')
const { passingRun, failingTestsRun, timeoutRun, errorRun } = require('./fixtures')
const Result = require('../lib/result')

const DEBUG = false

t('passing tests summary', t => {
  const result = new Result()
  result.add(passingRun)

  t.is(result.getSummary().trim(), '0 repositories with failures')
})

t('failing tests summary', t => {
  const result = new Result()
  result.add(passingRun)
  result.add(failingTestsRun)

  if (DEBUG) console.log(result.getSummary())

  t.is(
    result.getSummary().trim(),
    `1 repositories with failures

> hyperbee-diff-stream@1.0.4 test
  - not ok 14 - can handle hyperbee without key or value encoding # time = 76.511416ms
  - not ok 15 - yields with original encoding # time = 149.450009ms`
  )
})

t('test timeout summary', t => {
  const result = new Result()
  result.add(passingRun)
  result.add(timeoutRun)

  if (DEBUG) console.log(result.getSummary())

  t.is(
    result.getSummary().trim(),
    `1 repositories with failures

> hyperbee-diff-stream@1.0.4 test
  - [TEST ERROR] new bee forked, but no old fork nor changes to index`
  )
})

t('test error summary', t => {
  const result = new Result()
  result.add(passingRun)
  result.add(errorRun)

  if (DEBUG) console.log(result.getSummary())

  t.is(
    result.getSummary().trim(),
    `1 repositories with failures

> hyperbee-diff-stream@1.0.4 test
  - [TEST ERROR] new bee forked, but no old fork nor changes to index`
  )

  if (DEBUG) console.log(result.getSummary({ detailed: true }))
})

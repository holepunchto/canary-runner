const test = require('brittle')
const { npmIFailedRun, passingRun, failingTestsRun, timeoutRun, errorRun } = require('./fixtures')
const Result = require('../lib/result')

const DEBUG = true

test('passing tests summary', t => {
  const result = new Result()
  result.add(passingRun)

  t.is(result.getSummary().trim(), '0 repositories with failures')
})

test('failing tests summary', t => {
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

test('test timeout summary', t => {
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

test('test error summary', t => {
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

test('test npm i error summary', t => {
  const result = new Result()
  result.add(npmIFailedRun)

  if (DEBUG) console.log(result.getSummary())

  t.is(
    result.getSummary().trim(),
    `1 repositories with failures

holepunchto/hypercore had an unexpected failure during preliminary step 'npm i'

npm ERR! code ECONNRESET
npm ERR! errno ECONNRESET
npm ERR! network Invalid response body while trying to fetch https://registry.npmjs.org/protomux: aborted
npm ERR! network This is a problem related to network connectivity.
npm ERR! network In most cases you are behind a proxy or have bad network settings.
npm ERR! network
npm ERR! network If you are behind a proxy, please make sure that the
npm ERR! network 'proxy' config is set properly.  See: 'npm help config'`
  )
})

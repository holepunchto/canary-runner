const baseRunInfo = {
  branch: 'main',
  repo: 'holepunchto/hypercore',
  gitHash: '657b7068d6b16856311c33ff35f906e7d3d1d479'
}

const passingRun = {
  ...baseRunInfo,
  failed: false,
  step: 'npm-run-test',
  code: 0,
  stdout: `> hyperbee-diff-stream@1.0.4 test
> standard && brittle test/*.js --coverage

TAP version 13

# no changes -> empty diff
    ok 1 - should be equal
ok 1 - no changes -> empty diff # time = 167.79425ms

# index moved ahead
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 2 - index moved ahead # time = 175.972963ms

# new bee forked, but no old fork nor changes to index
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 3 - new bee forked, but no old fork nor changes to index # time = 1098.61164ms

# new continued old fork, but no changes to index
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should deep equal
    ok 4 - should deep equal
ok 4 - new continued old fork, but no changes to index # time = 110.408842ms

# both new index and new fork--old had up to date index
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should deep equal
    ok 6 - should deep equal
ok 5 - both new index and new fork--old had up to date index # time = 193.07363ms

# local version > 0, indexedLength still 0--merge in remote fork
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should deep equal
    ok 6 - should deep equal
ok 6 - local version > 0, indexedLength still 0--merge in remote fork # time = 108.392051ms

# new index, new fork and old fork all resolved nicely
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should deep equal
    ok 6 - should deep equal
ok 7 - new index, new fork and old fork all resolved nicely # time = 174.082047ms

# new index, new fork and old fork all resolved nicely (deletes)
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should deep equal
    ok 6 - should deep equal
ok 8 - new index, new fork and old fork all resolved nicely (deletes) # time = 174.033637ms

# new snapshot has same final value as old fork but through different path ->no change
    ok 1 - should deep equal
ok 9 - new snapshot has same final value as old fork but through different path ->no change # time = 157.491189ms

# both old and new made changes to the same key -> new value yielded, but source = the old value
    ok 1 - should be equal
    ok 2 - should deep equal
ok 10 - both old and new made changes to the same key -> new value yielded, but source = the old value # time = 139.123025ms

# complex autobase linearisation with truncates
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should be equal
    ok 6 - should be equal
    ok 7 - should deep equal
    ok 8 - should deep equal
    ok 9 - should be equal
    ok 10 - should be equal
    ok 11 - should deep equal
    ok 12 - should deep equal
    ok 13 - should be equal
ok 11 - complex autobase linearisation with truncates # time = 144.272764ms

# complex autobase linearisation with truncates and deletes
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should be equal
    ok 6 - should be equal
    ok 7 - should deep equal
    ok 8 - should deep equal
    ok 9 - should be equal
    ok 10 - should be equal
    ok 11 - should deep equal
    ok 12 - should deep equal
    ok 13 - should be equal
ok 12 - complex autobase linearisation with truncates and deletes # time = 159.233204ms

# works with normal hyperbee
    ok 1 - should deep equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 13 - works with normal hyperbee # time = 2.415549ms

# can handle hyperbee without key or value encoding
    ok 1 - should deep equal
    ok 2 - should deep equal
ok 14 - can handle hyperbee without key or value encoding # time = 84.199531ms

# yields with original encoding
    ok 1 - should deep equal
ok 15 - yields with original encoding # time = 142.640712ms

# can pass diffStream range opts
    ok 1 - should deep equal
ok 16 - can pass diffStream range opts # time = 135.581923ms

# diffStream range opts are encoded (handles sub-encodings)
    ok 1 - should deep equal
    ok 2 - should be equal
    ok 3 - should deep equal
ok 17 - diffStream range opts are encoded (handles sub-encodings) # time = 171.944616ms

# can pass in key- or valueEncoding
    ok 1 - should deep equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 18 - can pass in key- or valueEncoding # time = 85.795072ms

# reversing old- and new snapshot position yields reversed left-right
    ok 1 - sanity check
    ok 2 - should deep equal
    ok 3 - should be equal
    ok 4 - should deep equal
ok 19 - reversing old- and new snapshot position yields reversed left-right # time = 155.868201ms

# passed snapshots close when the beeDiffStream is destroyed
    ok 1 - should be equal
    ok 2 - should be equal
ok 20 - passed snapshots close when the beeDiffStream is destroyed # time = 82.34016ms

# correctly handles diff between snapshots older than the indexedLength (autobase view)
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should deep equal
    ok 4 - should deep equal
ok 21 - correctly handles diff between snapshots older than the indexedLength (autobase view) # time = 110.555953ms

# correctly handles diff between snapshots older than the indexedLength (normal bee)
    ok 1 - should deep equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 22 - correctly handles diff between snapshots older than the indexedLength (normal bee) # time = 2.132346ms

# works with JSON key encoding
    ok 1 - should deep equal
    ok 2 - should deep equal
ok 23 - works with JSON key encoding # time = 165.160234ms

# works with JSON key encoding and ranges
    ok 1 - should deep equal
    ok 2 - should deep equal
ok 24 - works with JSON key encoding and ranges # time = 172.306958ms

# does not close snapshots if option set
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
ok 25 - does not close snapshots if option set # time = 1.832142ms

# supports diffing values skipped by hyperbee encoding
    ok 1 - should deep equal
    ok 2 - should deep equal
ok 26 - supports diffing values skipped by hyperbee encoding # time = 78.28546ms

# complex scenario with many diff cases
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
    ok 4 - should deep equal
    ok 5 - should deep equal
ok 27 - complex scenario with many diff cases # time = 160.585667ms

# low overhead compared to normal diffStream if applied to bee
ok 28 - low overhead compared to normal diffStream if applied to bee # SKIP

# example works
    ok 1 - should be equal
    ok 2 - should be equal
ok 29 - example works # time = 122.182061ms

1..29
# tests = 29/29 pass
# asserts = 107/107 pass
# time = 4541.550321ms

# ok
`,
  stderr: ''
}

const failingTestsRun = {
  ...baseRunInfo,
  failed: true,
  step: 'npm-run-test',
  code: 1,
  stdout: `
> hyperbee-diff-stream@1.0.4 test
> standard && brittle test/*.js --coverage

TAP version 13

# no changes -> empty diff
    ok 1 - should be equal
ok 1 - no changes -> empty diff # time = 182.915181ms

# index moved ahead
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 2 - index moved ahead # time = 183.093138ms

# new bee forked, but no old fork nor changes to index
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 3 - new bee forked, but no old fork nor changes to index # time = 1096.972465ms

# new continued old fork, but no changes to index
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should deep equal
    ok 4 - should deep equal
ok 4 - new continued old fork, but no changes to index # time = 143.423801ms

# both new index and new fork--old had up to date index
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should deep equal
    ok 6 - should deep equal
ok 5 - both new index and new fork--old had up to date index # time = 219.64388ms

# local version > 0, indexedLength still 0--merge in remote fork
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should deep equal
    ok 6 - should deep equal
ok 6 - local version > 0, indexedLength still 0--merge in remote fork # time = 107.196686ms

# new index, new fork and old fork all resolved nicely
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should deep equal
    ok 6 - should deep equal
ok 7 - new index, new fork and old fork all resolved nicely # time = 180.457393ms

# new index, new fork and old fork all resolved nicely (deletes)
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should deep equal
    ok 6 - should deep equal
ok 8 - new index, new fork and old fork all resolved nicely (deletes) # time = 182.869073ms

# new snapshot has same final value as old fork but through different path ->no change
    ok 1 - should deep equal
ok 9 - new snapshot has same final value as old fork but through different path ->no change # time = 160.225498ms

# both old and new made changes to the same key -> new value yielded, but source = the old value
    ok 1 - should be equal
    ok 2 - should deep equal
ok 10 - both old and new made changes to the same key -> new value yielded, but source = the old value # time = 150.624289ms

# complex autobase linearisation with truncates
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should be equal
    ok 6 - should be equal
    ok 7 - should deep equal
    ok 8 - should deep equal
    ok 9 - should be equal
    ok 10 - should be equal
    ok 11 - should deep equal
    ok 12 - should deep equal
    ok 13 - should be equal
ok 11 - complex autobase linearisation with truncates # time = 153.550394ms

# complex autobase linearisation with truncates and deletes
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
    ok 5 - should be equal
    ok 6 - should be equal
    ok 7 - should deep equal
    ok 8 - should deep equal
    ok 9 - should be equal
    ok 10 - should be equal
    ok 11 - should deep equal
    ok 12 - should deep equal
    ok 13 - should be equal
ok 12 - complex autobase linearisation with truncates and deletes # time = 149.534514ms

# works with normal hyperbee
    ok 1 - should deep equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 13 - works with normal hyperbee # time = 2.548603ms

# can handle hyperbee without key or value encoding
    not ok 1 - should deep equal
      ---
      actual: 
        - 0: 49
          1: 45
          2: 49
      expected: 
        - 0: 50
          1: 45
          2: 49
      operator: alike
      source: |
          const diffs = await streamToArray(new BeeDiffStream(oldBee, bee.snapshot()))
          t.alike(diffs.map(({ left }) => left?.key), [b4a.from('2-1')])
        ----^
          t.alike(diffs.map(({ right }) => right?.key), [undefined]) // deletions
        })
      stack: |
        ./test/basic.js:420:5
        process.processTicksAndRejections (node:internal/process/task_queues:105:5)
        async Test._run (./node_modules/brittle/index.js:577:7)
      ...
    ok 2 - should deep equal
not ok 14 - can handle hyperbee without key or value encoding # time = 76.511416ms

# yields with original encoding
    not ok 1 - should deep equal
      ---
      actual: 
        - right: 
            key: 1-1
            value: 
              name: name1
        - left: 
            key: 1-2
            value: 
              name: name2
        - left: 
            key: 2-1
            value: 
              name: 2-name1
      expected: 
        - right: 
            key: 1-1
            value: 
              name: name1
        - left: 
            key: 1-2
            value: 
              name: name2
      operator: alike
      source: |
        
          t.alike(actualClean, expectedClean)
        ----^
        }
      stack: |
        sameKeysAndValues (./test/basic.js:805:5)
        ./test/basic.js:459:3
        process.processTicksAndRejections (node:internal/process/task_queues:105:5)
        async Test._run (./node_modules/brittle/index.js:577:7)
      ...
not ok 15 - yields with original encoding # time = 149.450009ms

# can pass diffStream range opts
    ok 1 - should deep equal
ok 16 - can pass diffStream range opts # time = 148.218015ms

# diffStream range opts are encoded (handles sub-encodings)
    ok 1 - should deep equal
    ok 2 - should be equal
    ok 3 - should deep equal
ok 17 - diffStream range opts are encoded (handles sub-encodings) # time = 160.470133ms

# can pass in key- or valueEncoding
    ok 1 - should deep equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 18 - can pass in key- or valueEncoding # time = 95.215146ms

# reversing old- and new snapshot position yields reversed left-right
    ok 1 - sanity check
    ok 2 - should deep equal
    ok 3 - should be equal
    ok 4 - should deep equal
ok 19 - reversing old- and new snapshot position yields reversed left-right # time = 146.447775ms

# passed snapshots close when the beeDiffStream is destroyed
    ok 1 - should be equal
    ok 2 - should be equal
ok 20 - passed snapshots close when the beeDiffStream is destroyed # time = 77.22968ms

# correctly handles diff between snapshots older than the indexedLength (autobase view)
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should deep equal
    ok 4 - should deep equal
ok 21 - correctly handles diff between snapshots older than the indexedLength (autobase view) # time = 108.465898ms

# correctly handles diff between snapshots older than the indexedLength (normal bee)
    ok 1 - should deep equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 22 - correctly handles diff between snapshots older than the indexedLength (normal bee) # time = 2.05037ms

# works with JSON key encoding
    ok 1 - should deep equal
    ok 2 - should deep equal
ok 23 - works with JSON key encoding # time = 160.452672ms

# works with JSON key encoding and ranges
    ok 1 - should deep equal
    ok 2 - should deep equal
ok 24 - works with JSON key encoding and ranges # time = 204.981103ms

# does not close snapshots if option set
    ok 1 - should be equal
    ok 2 - should be equal
    ok 3 - should be equal
    ok 4 - should be equal
ok 25 - does not close snapshots if option set # time = 1.732396ms

# supports diffing values skipped by hyperbee encoding
    ok 1 - should deep equal
    ok 2 - should deep equal
ok 26 - supports diffing values skipped by hyperbee encoding # time = 121.668856ms

# complex scenario with many diff cases
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
    ok 4 - should deep equal
    ok 5 - should deep equal
ok 27 - complex scenario with many diff cases # time = 166.729997ms

# low overhead compared to normal diffStream if applied to bee
ok 28 - low overhead compared to normal diffStream if applied to bee # SKIP

# example works
    ok 1 - should be equal
    ok 2 - should be equal
ok 29 - example works # time = 117.839728ms

1..29
# tests = 27/29 pass
# asserts = 105/107 pass
# time = 4717.482935ms

# not ok
`,
  stderr: ''
}

const timeoutRun = {
  ...baseRunInfo,
  failed: true,
  step: 'npm-run-test',
  code: 1,
  stdout: `
> hyperbee-diff-stream@1.0.4 test
> standard && brittle test/*.js --coverage

TAP version 13

# no changes -> empty diff
    ok 1 - should be equal
ok 1 - no changes -> empty diff # time = 161.581839ms

# index moved ahead
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 2 - index moved ahead # time = 178.105791ms

# new bee forked, but no old fork nor changes to index
`,
  stderr: `/home/hans/holepunch/hyperbee-diff-stream/node_modules/brittle/index.js:317
      this._onend(new Error('Test timed out after ' + ms + ' ms'))
                  ^

Error: Test timed out after 100 ms
    at Timeout.ontimeout [as _onTimeout] (/home/hans/holepunch/hyperbee-diff-stream/node_modules/brittle/index.js:317:19)
    at listOnTimeout (node:internal/timers:594:17)
    at process.processTimers (node:internal/timers:529:7)

Node.js v22.7.0`
}

const errorRun = {
  ...baseRunInfo,
  failed: true,
  step: 'npm-run-test',
  code: 1,
  stdout: `
> hyperbee-diff-stream@1.0.4 test
> standard && brittle test/*.js --coverage

TAP version 13

# no changes -> empty diff
    ok 1 - should be equal
ok 1 - no changes -> empty diff # time = 173.597624ms

# index moved ahead
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
ok 2 - index moved ahead # time = 199.602659ms

# new bee forked, but no old fork nor changes to index
    ok 1 - should be equal
    ok 2 - should deep equal
    ok 3 - should deep equal
`,
  stderr: `/home/hans/holepunch/hyperbee-diff-stream/test/basic.js:61
  throw new Error('break test')
        ^

Error: break test
    at /home/hans/holepunch/hyperbee-diff-stream/test/basic.js:61:9
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async Test._run (/home/hans/holepunch/hyperbee-diff-stream/node_modules/brittle/index.js:577:7)`
}

const npmIFailedRun = {
  ...baseRunInfo,
  failed: true,
  code: 1,
  step: 'npm i',
  stdout: '',
  stderr: `npm ERR! code ECONNRESET
npm ERR! errno ECONNRESET
npm ERR! network Invalid response body while trying to fetch https://registry.npmjs.org/protomux: aborted
npm ERR! network This is a problem related to network connectivity.
npm ERR! network In most cases you are behind a proxy or have bad network settings.
npm ERR! network
npm ERR! network If you are behind a proxy, please make sure that the
npm ERR! network 'proxy' config is set properly.  See: 'npm help config'
`
}

module.exports = {
  passingRun,
  failingTestsRun,
  timeoutRun,
  errorRun,
  npmIFailedRun
}

# Canary Runner

Run all tests for a list of repositories, and summarise the results.

Supports tests written with [brittle](https://github.com/holepunchto/brittle). Should work with other tests too, as long as they report their output in TAP format.

## Install

```sh
npm install -g canary-runner
```

## Usage

See `canary --help`.

Set the `CANARY_PAT` environment variable if you want to access private repositories over https (see CI-usage section)

Examples:

```sh
# run the tests of some-repo
canary holepunchto/some-repo

# run all tests of a list of repositories (the config should be stored in a .json in a github repository)
canary --config holepunchto/some-repo/repos.json

# run the canary but use your local folder with hypercore as hypercore
canary holepunchto/some-repo --overwrite hypercore=./my-dev/hypercore

# run the canary on 2 repos
canary holepunchto/some-repo holepunchto/some-other-repo
```

Or any mix of the above

## CI Usage

CLI usage relies on SSH for accessing private repositories, which works fine on your own machine.

For CI usage, define a github PAT with read rights to the repositories you will test, and store it as a secret accessible from the repository where the CI lives.

Example usage:

```
    - run: npm install canary-runner
    - run: npx canary --config holepunchto/canary-tests/repos.json # Replace with your own config
      env:
        CANARY_PAT: ${{ secrets.CANARY_READ_REPOS_PAT }} # Ensure this secret exists and is a valid PAT
        NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      working-directory: ${{ github.workspace }} # Where the checkout action checked it out
```

## Config format

An example .json config format (for the --config flag):

```
{
  "holepunchto/hypercore": {},
  "holepunchto/hyperbee": {},
  "holepunchto/hyperdht": {
    "additionalNpmScripts": [
      "integration"
    ]
  }
}
```

The entries under `additionalNpmScripts` will all be run (as `npm run <entryname>`). `npm run test` is always run and need not be specified.

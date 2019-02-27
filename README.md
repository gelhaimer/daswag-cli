daSWAG CLI
==========

Generate your full Serverless Web Application in seconds with daswag cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/daswag-cli.svg)](https://npmjs.org/package/daswag-cli)
[![CircleCI](https://circleci.com/gh/daswag/daswag-cli/tree/master.svg?style=shield)](https://circleci.com/gh/daswag/daswag-cli/tree/master)
[![Codecov](https://codecov.io/gh/daswag/daswag-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/daswag/daswag-cli)
[![Downloads/week](https://img.shields.io/npm/dw/daswag-cli.svg)](https://npmjs.org/package/daswag-cli)
[![License](https://img.shields.io/npm/l/daswag-cli.svg)](https://github.com/daswag/daswag-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g daswag-cli
$ daswag COMMAND
running command...
$ daswag (-v|--version|version)
daswag-cli/0.0.0 darwin-x64 node-v10.15.1
$ daswag --help [COMMAND]
USAGE
  $ daswag COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`daswag hello [FILE]`](#daswag-hello-file)
* [`daswag help [COMMAND]`](#daswag-help-command)

## `daswag hello [FILE]`

describe the command here

```
USAGE
  $ daswag hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ daswag hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/daswag/daswag-cli/blob/v0.0.0/src/commands/hello.ts)_

## `daswag help [COMMAND]`

display help for daswag

```
USAGE
  $ daswag help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->

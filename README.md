daSWAG: Serverless Web Application Generator CLI
==========

Generate your full Serverless Web Application in seconds with daswag cli

[![Gitter](https://badges.gitter.im/daswag/community.svg)](https://gitter.im/daswag/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/daswag-cli.svg)](https://npmjs.org/package/daswag-cli)
[![CircleCI](https://circleci.com/gh/daswag/daswag-cli/tree/master.svg?style=shield)](https://circleci.com/gh/daswag/daswag-cli/tree/master)
[![Codecov](https://codecov.io/gh/daswag/daswag-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/daswag/daswag-cli)
[![Downloads/week](https://img.shields.io/npm/dw/daswag-cli.svg)](https://npmjs.org/package/daswag-cli)
[![License](https://img.shields.io/npm/l/daswag-cli.svg)](https://github.com/daswag/daswag-cli/blob/master/package.json)

<!-- toc -->
* [Description](#description)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Description

This is a framework for building Web Application using only Serverless technologies.

[See the docs for more information](https://www.daswag.tech/documentation).

# Getting Started

The [Getting Started tutorial](https://www.daswag.tech/documentation/getting_started) is a step-by-step guide to introduce you to daSWAG. If you have not developed anything using Serverless technologies, this Getting Started is a great place to get started.

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
* [`daswag autocomplete [SHELL]`](#daswag-autocomplete-shell)
* [`daswag doc [KEYWORD]`](#daswag-doc-keyword)
* [`daswag help [COMMAND]`](#daswag-help-command)
* [`daswag new:api`](#daswag-newapi)
* [`daswag new:client`](#daswag-newclient)
* [`daswag new:project`](#daswag-newproject)
* [`daswag update [CHANNEL]`](#daswag-update-channel)

## `daswag autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ daswag autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ daswag autocomplete
  $ daswag autocomplete bash
  $ daswag autocomplete zsh
  $ daswag autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.0/src/commands/autocomplete/index.ts)_

## `daswag doc [KEYWORD]`

Opens the official daSWAG documentation (daswag.tech/documentation) in a browser, and searches for a given keyword.

```
USAGE
  $ daswag doc [KEYWORD]

OPTIONS
  -s, --search  Search on Google
```

_See code: [src/commands/doc.ts](https://github.com/daswag/daswag-cli/blob/v0.0.0/src/commands/doc.ts)_

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

## `daswag new:api`

```
USAGE
  $ daswag new:api
```

_See code: [src/commands/new/api.ts](https://github.com/daswag/daswag-cli/blob/v0.0.0/src/commands/new/api.ts)_

## `daswag new:client`

```
USAGE
  $ daswag new:client
```

_See code: [src/commands/new/client.ts](https://github.com/daswag/daswag-cli/blob/v0.0.0/src/commands/new/client.ts)_

## `daswag new:project`

```
USAGE
  $ daswag new:project
```

_See code: [src/commands/new/project.ts](https://github.com/daswag/daswag-cli/blob/v0.0.0/src/commands/new/project.ts)_

## `daswag update [CHANNEL]`

update the daswag CLI

```
USAGE
  $ daswag update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.9/src/commands/update.ts)_
<!-- commandsstop -->

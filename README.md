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
* [`daswag autocomplete [SHELL]`](#daswag-autocomplete-shell)
* [`daswag doc`](#daswag-doc)
* [`daswag help [COMMAND]`](#daswag-help-command)
* [`daswag list-plugins`](#daswag-list-plugins)
* [`daswag plugins`](#daswag-plugins)
* [`daswag plugins:install PLUGIN...`](#daswag-pluginsinstall-plugin)
* [`daswag plugins:link PLUGIN`](#daswag-pluginslink-plugin)
* [`daswag plugins:uninstall PLUGIN...`](#daswag-pluginsuninstall-plugin)
* [`daswag plugins:update`](#daswag-pluginsupdate)
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

## `daswag doc`

Opens the official daSWAG documentation (daswag.tech/documentation) in a browser, and searches for a given keyword.

```
USAGE
  $ daswag doc
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

## `daswag list-plugins`

List all available plugins to use with daSWAG CLI.

```
USAGE
  $ daswag list-plugins
```

_See code: [src/commands/list-plugins.ts](https://github.com/daswag/daswag-cli/blob/v0.0.0/src/commands/list-plugins.ts)_

## `daswag plugins`

list installed plugins

```
USAGE
  $ daswag plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ daswag plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/index.ts)_

## `daswag plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ daswag plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ daswag plugins:add

EXAMPLES
  $ daswag plugins:install myplugin 
  $ daswag plugins:install https://github.com/someuser/someplugin
  $ daswag plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/install.ts)_

## `daswag plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ daswag plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' 
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ daswag plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/link.ts)_

## `daswag plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ daswag plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ daswag plugins:unlink
  $ daswag plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/uninstall.ts)_

## `daswag plugins:update`

update installed plugins

```
USAGE
  $ daswag plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/update.ts)_

## `daswag update [CHANNEL]`

update the daswag CLI

```
USAGE
  $ daswag update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.9/src/commands/update.ts)_
<!-- commandsstop -->

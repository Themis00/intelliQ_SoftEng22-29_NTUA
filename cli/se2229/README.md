se2229 CLI
=================

Command Line Interface of team 29

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g se2229
$ se2229 COMMAND
running command...
$ se2229 (--version)
se2229/0.1.1 win32-x64 node-v18.13.0
$ se2229 --help [COMMAND]
USAGE
  $ se2229 COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g se2229
$ se2229 COMMAND
running command...
$ se2229 (--version)
se2229/0.1.0 win32-x64 node-v18.12.1
$ se2229 --help [COMMAND]
USAGE
  $ se2229 COMMAND
...
```
<!-- usagestop -->
cd to dir ./cli/se2229 and run:
```sh-session
$ npm install -g se2229
$ se2229 COMMAND
running command...
$ se2229 (--version)
se2229/0.0.0 win32-x64 node-v18.12.1
$ se2229 --help [COMMAND]
USAGE
  $ se2229 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`se2229 doanswer`](#se2229-doanswer)
* [`se2229 getquestionanswers`](#se2229-getquestionanswers)
* [`se2229 getsessionanswers`](#se2229-getsessionanswers)
* [`se2229 healthcheck`](#se2229-healthcheck)
* [`se2229 help [COMMANDS]`](#se2229-help-commands)
* [`se2229 plugins`](#se2229-plugins)
* [`se2229 plugins:install PLUGIN...`](#se2229-pluginsinstall-plugin)
* [`se2229 plugins:inspect PLUGIN...`](#se2229-pluginsinspect-plugin)
* [`se2229 plugins:install PLUGIN...`](#se2229-pluginsinstall-plugin-1)
* [`se2229 plugins:link PLUGIN`](#se2229-pluginslink-plugin)
* [`se2229 plugins:uninstall PLUGIN...`](#se2229-pluginsuninstall-plugin)
* [`se2229 plugins:uninstall PLUGIN...`](#se2229-pluginsuninstall-plugin-1)
* [`se2229 plugins:uninstall PLUGIN...`](#se2229-pluginsuninstall-plugin-2)
* [`se2229 plugins update`](#se2229-plugins-update)
* [`se2229 question`](#se2229-question)
* [`se2229 questionnaire`](#se2229-questionnaire)
* [`se2229 questionnaireupd`](#se2229-questionnaireupd)
* [`se2229 resetall`](#se2229-resetall)
* [`se2229 resetq`](#se2229-resetq)
* [`se2229 session`](#se2229-session)

## `se2229 doanswer`

Insert answer in the database

```
USAGE
  $ se2229 doanswer --format json|csv --questionnaire_id <value> --question_id <value> --session_id <value>
    --option_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --option_id=<value>         (required) the ID of the option selected for the answer
  --question_id=<value>       (required) choose the question whose answer will be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose answer will be returned
  --session_id=<value>        (required) 4 random symbol string that correspond to the session

DESCRIPTION
  Insert answer in the database
```

_See code: [dist/commands/doanswer.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/doanswer.ts)_

## `se2229 getquestionanswers`

returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire

```
USAGE
  $ se2229 getquestionanswers --format json|csv --questionnaire_id <value> --question_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --question_id=<value>       (required) choose the question whose answer will be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose answers will be returned

DESCRIPTION
  returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire
```

_See code: [dist/commands/getquestionanswers.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/getquestionanswers.ts)_

## `se2229 getsessionanswers`

returns the answers of given questionnaireID and sessionID

```
USAGE
  $ se2229 getsessionanswers --format json|csv --questionnaire_id <value> --session_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire whose answers will be returned
  --session_id=<value>        (required) choose the session whose answers will be returned

DESCRIPTION
  returns the answers of given questionnaireID and sessionID
```

_See code: [dist/commands/getsessionanswers.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/getsessionanswers.ts)_

## `se2229 healthcheck`

tests live server for errors

```
USAGE
  $ se2229 healthcheck --format json|csv

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>

DESCRIPTION
  tests live server for errors
```

_See code: [dist/commands/healthcheck.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/healthcheck.ts)_

## `se2229 help [COMMANDS]`

Display help for se2229.

```
USAGE
  $ se2229 help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for se2229.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.4/src/commands/help.ts)_

## `se2229 plugins`

List installed plugins.

```
USAGE
  $ se2229 plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ se2229 plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.3.0/src/commands/plugins/index.ts)_

## `se2229 plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ se2229 plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ se2229 plugins add

EXAMPLES
  $ se2229 plugins:install myplugin 

  $ se2229 plugins:install https://github.com/someuser/someplugin

  $ se2229 plugins:install someuser/someplugin
```

## `se2229 plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ se2229 plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ se2229 plugins:inspect myplugin
```

## `se2229 plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ se2229 plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ se2229 plugins add

EXAMPLES
  $ se2229 plugins:install myplugin 

  $ se2229 plugins:install https://github.com/someuser/someplugin

  $ se2229 plugins:install someuser/someplugin
```

## `se2229 plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ se2229 plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ se2229 plugins:link myplugin
```

## `se2229 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ se2229 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ se2229 plugins unlink
  $ se2229 plugins remove
```

## `se2229 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ se2229 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ se2229 plugins unlink
  $ se2229 plugins remove
```

## `se2229 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ se2229 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ se2229 plugins unlink
  $ se2229 plugins remove
```

## `se2229 plugins update`

Update installed plugins.

```
USAGE
  $ se2229 plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `se2229 question`

returns an object that includes the question info and options of a specific question of a specific questionnaire

```
USAGE
  $ se2229 question --format json|csv --questionnaire_id <value> --question_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --question_id=<value>       (required) choose the question to be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose question will be returned

DESCRIPTION
  returns an object that includes the question info and options of a specific question of a specific questionnaire
```

_See code: [dist/commands/question.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/question.ts)_

## `se2229 questionnaire`

returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their attributes

```
USAGE
  $ se2229 questionnaire --format json|csv --questionnaire_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire whose questions will be returned

DESCRIPTION
  returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their
  attributes
```

_See code: [dist/commands/questionnaire.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/questionnaire.ts)_

## `se2229 questionnaireupd`

add a new questionnaire

```
USAGE
  $ se2229 questionnaireupd --format json|csv --source <value>

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>
  --source=<value>   (required) the file to upload to the server

DESCRIPTION
  add a new questionnaire
```

_See code: [dist/commands/questionnaireupd.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/questionnaireupd.ts)_

## `se2229 resetall`

reset data

```
USAGE
  $ se2229 resetall --format json|csv

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>

DESCRIPTION
  reset data
```

_See code: [dist/commands/resetall.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/resetall.ts)_

## `se2229 resetq`

reset questions

```
USAGE
  $ se2229 resetq --format json|csv --questionnaire_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire to be reseted

DESCRIPTION
  reset questions
```

_See code: [dist/commands/resetq.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/resetq.ts)_

## `se2229 session`

generates an new session, saves it in the database and returns it

```
USAGE
  $ se2229 session --format json|csv

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>

DESCRIPTION
  generates an new session, saves it in the database and returns it
```

_See code: [dist/commands/session.ts](https://github.com/cli/se2229/blob/v0.1.1/dist/commands/session.ts)_
<!-- commandsstop -->
* [`se2229 doanswer`](#se2229-doanswer)
* [`se2229 getquestionanswers`](#se2229-getquestionanswers)
* [`se2229 getsessionanswers`](#se2229-getsessionanswers)
* [`se2229 healthcheck`](#se2229-healthcheck)
* [`se2229 help [COMMANDS]`](#se2229-help-commands)
* [`se2229 plugins`](#se2229-plugins)
* [`se2229 plugins:install PLUGIN...`](#se2229-pluginsinstall-plugin)
* [`se2229 plugins:inspect PLUGIN...`](#se2229-pluginsinspect-plugin)
* [`se2229 plugins:install PLUGIN...`](#se2229-pluginsinstall-plugin-1)
* [`se2229 plugins:link PLUGIN`](#se2229-pluginslink-plugin)
* [`se2229 plugins:uninstall PLUGIN...`](#se2229-pluginsuninstall-plugin)
* [`se2229 plugins:uninstall PLUGIN...`](#se2229-pluginsuninstall-plugin-1)
* [`se2229 plugins:uninstall PLUGIN...`](#se2229-pluginsuninstall-plugin-2)
* [`se2229 plugins update`](#se2229-plugins-update)
* [`se2229 question`](#se2229-question)
* [`se2229 questionnaire`](#se2229-questionnaire)
* [`se2229 questionnaireupd`](#se2229-questionnaireupd)
* [`se2229 resetall`](#se2229-resetall)
* [`se2229 resetq`](#se2229-resetq)

## `se2229 doanswer`

Insert answer in the database

```
USAGE
  $ se2229 doanswer --format json|csv --questionnaire_id <value> --question_id <value> --session_id <value>
    --option_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --option_id=<value>         (required) the ID of the option selected for the answer
  --question_id=<value>       (required) choose the question whose answer will be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose answer will be returned
  --session_id=<value>        (required) 4 random symbol string that correspond to the session

DESCRIPTION
  Insert answer in the database
```

_See code: [dist/commands/doanswer.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/doanswer.ts)_

## `se2229 getquestionanswers`

returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire

```
USAGE
  $ se2229 getquestionanswers --format json|csv --questionnaire_id <value> --question_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --question_id=<value>       (required) choose the question whose answer will be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose answers will be returned

DESCRIPTION
  returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire
```

_See code: [dist/commands/getquestionanswers.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/getquestionanswers.ts)_

## `se2229 getsessionanswers`

returns the answers of given questionnaireID and sessionID

```
USAGE
  $ se2229 getsessionanswers --format json|csv --questionnaire_id <value> --session_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire whose answers will be returned
  --session_id=<value>        (required) choose the session whose answers will be returned

DESCRIPTION
  returns the answers of given questionnaireID and sessionID
```

_See code: [dist/commands/getsessionanswers.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/getsessionanswers.ts)_

## `se2229 healthcheck`

tests live server for errors

```
USAGE
  $ se2229 healthcheck --format json|csv

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>

DESCRIPTION
  tests live server for errors
```

_See code: [dist/commands/healthcheck.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/healthcheck.ts)_

## `se2229 help [COMMANDS]`

Display help for se2229.

```
USAGE
  $ se2229 help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for se2229.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.4/src/commands/help.ts)_

## `se2229 plugins`

List installed plugins.

```
USAGE
  $ se2229 plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ se2229 plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.3.0/src/commands/plugins/index.ts)_

## `se2229 plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ se2229 plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ se2229 plugins add

EXAMPLES
  $ se2229 plugins:install myplugin 

  $ se2229 plugins:install https://github.com/someuser/someplugin

  $ se2229 plugins:install someuser/someplugin
```

## `se2229 plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ se2229 plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ se2229 plugins:inspect myplugin
```

## `se2229 plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ se2229 plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ se2229 plugins add

EXAMPLES
  $ se2229 plugins:install myplugin 

  $ se2229 plugins:install https://github.com/someuser/someplugin

  $ se2229 plugins:install someuser/someplugin
```

## `se2229 plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ se2229 plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ se2229 plugins:link myplugin
```

## `se2229 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ se2229 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ se2229 plugins unlink
  $ se2229 plugins remove
```

## `se2229 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ se2229 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ se2229 plugins unlink
  $ se2229 plugins remove
```

## `se2229 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ se2229 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ se2229 plugins unlink
  $ se2229 plugins remove
```

## `se2229 plugins update`

Update installed plugins.

```
USAGE
  $ se2229 plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `se2229 question`

returns an object that includes the question info and options of a specific question of a specific questionnaire

```
USAGE
  $ se2229 question --format json|csv --questionnaire_id <value> --question_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --question_id=<value>       (required) choose the question to be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose question will be returned

DESCRIPTION
  returns an object that includes the question info and options of a specific question of a specific questionnaire
```

_See code: [dist/commands/question.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/question.ts)_

## `se2229 questionnaire`

returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their attributes

```
USAGE
  $ se2229 questionnaire --format json|csv --questionnaire_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire whose questions will be returned

DESCRIPTION
  returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their
  attributes
```

_See code: [dist/commands/questionnaire.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/questionnaire.ts)_

## `se2229 questionnaireupd`

add a new questionnaire

```
USAGE
  $ se2229 questionnaireupd --format json|csv --source <value>

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>
  --source=<value>   (required) the file to upload to the server

DESCRIPTION
  add a new questionnaire
```

_See code: [dist/commands/questionnaireupd.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/questionnaireupd.ts)_

## `se2229 resetall`

reset data

```
USAGE
  $ se2229 resetall --format json|csv

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>

DESCRIPTION
  reset data
```

_See code: [dist/commands/resetall.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/resetall.ts)_

## `se2229 resetq`

reset questions

```
USAGE
  $ se2229 resetq --format json|csv --questionnaire_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire to be reseted

DESCRIPTION
  reset questions
```

_See code: [dist/commands/resetq.ts](https://github.com/cli/se2229/blob/v0.1.0/dist/commands/resetq.ts)_
<!-- commandsstop -->
* [`se2229 doanswer`](#se2229-doanswer)
* [`se2229 getquestionanswers`](#se2229-getquestionanswers)
* [`se2229 getsessionanswers`](#se2229-getsessionanswers)
* [`se2229 healthcheck`](#se2229-healthcheck)
* [`se2229 question`](#se2229-question)
* [`se2229 questionnaire`](#se2229-questionnaire)
* [`se2229 questionnaire_upd`](#se2229-questionnaire_upd)
* [`se2229 resetall`](#se2229-resetall)
* [`se2229 resetq`](#se2229-resetq)

## `se2229 doanswer`

Insert answer in the database

```
USAGE
  $ se2229 doanswer --format json|csv --questionnaire_id <value> --question_id <value> --session_id <value>
    --option_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --option_id=<value>         (required) the ID of the option selected for the answer
  --question_id=<value>       (required) choose the question whose answer will be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose answer will be returned
  --session_id=<value>           (required) 4 random symbol string that correspond to the session

DESCRIPTION
  Insert answer in the database
```

_See code: [dist/commands/doanswer.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/doanswer.ts)_

## `se2229 getquestionanswers`

returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire

```
USAGE
  $ se2229 getquestionanswers --format json|csv --questionnaire_id <value> --question_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --question_id=<value>       (required) choose the question whose answer will be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose answers will be returned

DESCRIPTION
  returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire
```

_See code: [dist/commands/getquestionanswers.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/getquestionanswers.ts)_

## `se2229 getsessionanswers`

returns the answers of given questionnaireID and sessionID

```
USAGE
  $ se2229 getsessionanswers --format json|csv --questionnaire_id <value> --session_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire whose answers will be returned
  --session_id=<value>        (required) choose the session whose answers will be returned

DESCRIPTION
  returns the answers of given questionnaireID and session
```

_See code: [dist/commands/getsessionanswers.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/getsessionanswers.ts)_

## `se2229 healthcheck`

tests live server for errors

```
USAGE
  $ se2229 healthcheck --format json|csv

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>

DESCRIPTION
  tests live server for errors
```

_See code: [dist/commands/healthcheck.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/healthcheck.ts)_

## `se2229 question`

returns an object that includes the question info and options of a specific question of a specific questionnaire

```
USAGE
  $ se2229 question --format json|csv --questionnaire_id <value> --question_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --question_id=<value>       (required) choose the question to be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose question will be returned

DESCRIPTION
  returns an object that includes the question info and options of a specific question of a specific questionnaire
```

_See code: [dist/commands/question.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/question.ts)_

## `se2229 questionnaire`

returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their attributes

```
USAGE
  $ se2229 questionnaire --format json|csv --questionnaire_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire whose questions will be returned

DESCRIPTION
  returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their
  attributes
```

_See code: [dist/commands/questionnaire.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/questionnaire.ts)_

## `se2229 questionnaire_upd`

add a new questionnaire

```
USAGE
  $ se2229 questionnaire_upd --format json|csv --source <value>

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>
  --source=<value>   (required) the file to upload to the server

DESCRIPTION
  add a new questionnaire
```

_See code: [dist/commands/questionnaire_upd.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/questionnaire_upd.ts)_

## `se2229 resetall`

reset data

```
USAGE
  $ se2229 resetall --format json|csv

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>

DESCRIPTION
  reset data
```

_See code: [dist/commands/resetall.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/resetall.ts)_

## `se2229 resetq`

reset questions

```
USAGE
  $ se2229 resetq --format json|csv --questionnaire_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire to be reseted

DESCRIPTION
  reset questions
```

_See code: [dist/commands/resetq.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/resetq.ts)_
<!-- commandsstop -->

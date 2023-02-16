se2229 CLI
=================

Command Line Interface of team 29

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
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
* [`se2229 question`](#se2229-question)
* [`se2229 questionnaire`](#se2229-questionnaire)
* [`se2229 questionnaire_upd`](#se2229-questionnaire_upd)
* [`se2229 resetall`](#se2229-resetall)
* [`se2229 resetq`](#se2229-resetq)

## `se2229 doanswer`

Insert answer in the database

```
USAGE
  $ se2229 doanswer --format json|csv --questionnaire_id <value> --question_id <value> --session <value>
    --option_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --option_id=<value>         (required) the ID of the option selected for the answer
  --question_id=<value>       (required) choose the question to be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose question will be returned
  --session=<value>           (required) 4 random symbol string that correspond to the session

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
  --question_id=<value>       (required) choose the question to be returned
  --questionnaire_id=<value>  (required) choose the questionnaire whose getquestionanswers will be returned

DESCRIPTION
  returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire
```

_See code: [dist/commands/getquestionanswers.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/getquestionanswers.ts)_

## `se2229 getsessionanswers`

returns the answers of given questionnaireID and session

```
USAGE
  $ se2229 getsessionanswers --format json|csv --questionnaire_id <value> --session <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire whose getsessionanswers will be returned
  --session=<value>           (required) choose the session whose answers will be returned

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
  --questionnaire_id=<value>  (required) choose the questionnaire whose questionnaire will be returned

DESCRIPTION
  returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their
  attributes
```

_See code: [dist/commands/questionnaire.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/questionnaire.ts)_

## `se2229 questionnaire_upd`

returns the answers of given questionnaireID and session

```
USAGE
  $ se2229 questionnaire_upd --format json|csv --source <value>

FLAGS
  --format=<option>  (required) [default: json]
                     <options: json|csv>
  --source=<value>   (required) the file to upload to the server

DESCRIPTION
  returns the answers of given questionnaireID and session
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

reset question

```
USAGE
  $ se2229 resetq --format json|csv --questionnaire_id <value>

FLAGS
  --format=<option>           (required) [default: json]
                              <options: json|csv>
  --questionnaire_id=<value>  (required) choose the questionnaire to be reseted

DESCRIPTION
  reset question
```

_See code: [dist/commands/resetq.ts](https://github.com/cli/se2229/blob/v0.0.0/dist/commands/resetq.ts)_
<!-- commandsstop -->

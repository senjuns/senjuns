# Contributing

Thanks for your interest in contributing to senjuns.com ! ❤️

We highly value contributions, with roughly half of all commits to senjuns.com coming from the community. We want to recognize all your hard work by getting your code merged as quickly as we can, so please read the guidance here carefully to make sure the review process goes smoothly.

This document describes how to set up a development environment and submit your changes. Please let us know if it's not up-to-date (even better, submit a PR with your corrections ;-)).

- [Getting Started](#getting-started)
- [Pull Requests](#pull-requests)
  - [Step 1: Find something to work on](#step-1-find-something-to-work-on)
  - [Step 2: Design (optional)](#step-2-design)
  - [Step 3: Work your Magic](#step-3-work-your-magic)
  - [Step 4: Pull Request](#step-4-pull-request)
  - [Step 5: Merge](#step-5-merge)
- [Breaking Changes](#breaking-changes)
- [Documentation](#documentation)
  - [Rosetta](#rosetta)
- [Tools](#tools)
  - [Linters](#linters)
- [Feature Flags](#feature-flags)
- [Versioning and Release](#versioning-and-release)
- [Troubleshooting](#troubleshooting)
- [Debugging](#debugging)
  - [Connecting the VS Code Debugger](#connecting-the-vs-code-debugger)
  - [Run a CDK unit test in the debugger](#run-a-cdk-unit-test-in-the-debugger)
- [Related Repositories](#related-repositories)

## Getting Started

The following steps describe how to set up the senjuns.com repository on your local machine.

### Setup

The following tools need to be installed on your system prior to installing the CDK:

- [Node.js >= 14.15.0](https://nodejs.org/download/release/latest-v14.x/)
  - We recommend using a version in [Active LTS](https://nodejs.org/en/about/releases/)
- [Yarn >= 1.19.1, < 2](https://yarnpkg.com/lang/en/docs/install)
- [Docker >= 19.03](https://docs.docker.com/get-docker/)
  - the Docker daemon must also be running

First fork the repository, and then run the following commands to clone the repository locally.

```console
$ git clone https://github.com/{your-account}/senjun-teams.git
$ cd senjun-teams
$ yarn install
$ yarn projen # installs dependencies in sub projects
```

We recommend that you use [Visual Studio Code](https://code.visualstudio.com/) to work on the repo.
We use `eslint` to keep our code consistent in terms of style and reducing defects. We recommend installing
the vscode recommendations in .vscode/extensions.json .

### Repo Layout

The AWS CDK is a [NPM](https://www.npmjs.com/about) project written in [typescript](https://www.typescriptlang.org/).
More specifically, it is a [monorepo managed using projen](https://github.com/projen/projen).
If you're unfamiliar with any of these technologies, it is useful to learn about them and will make understanding the codebase easier but strictly not necessary for simple contributions.

The repo contains the **landingpage** and dashboard which are React TS projects and **backend** which is an [AWS CDK App](https://github.com/aws/aws-cdk) managed by [projen](https://github.com/projen/projen).

### Build

...

## GitHub

In this section you will find related thinks to GitHub

### Issue Types

We will leverage GitHub Issues <https://github.com/senjun-teams/senjun-teams/issues> for tracking working on features, bugs or refactoring tasks. So if you want to update Code an issue for it should exist! Issue types have a related issue label to mark them as such.

#### Feature

Template:

```txt
Story:

As a developer it would be cool if the side could do feature A:

Acceptance Criteria:
* Feature A is implemented
* A test for feature A exist

Notice:
* On this github side you find an example
```

#### Bug

Template:

```txt
Description:

When I press on Button B everything stops to work:

Steps to reproduce:
1) Log into side
2) Press on Button B

Expected Result:
A nice picture is seen

Actual Result:
Everything stops to work
```

### Issue Sizing

1, 2, 3, 5, 8, 13 ...

### Examples

- fix: #2 Changed button B
- feat: #4 I added a new layout to about side

## Working with Code

Here we describe how you work with the programming code.

### Branch Naming Convention

Create a local and remote branch from main with patter {ISSUE*TYPE}/{ISSUE_ID}*{DESCRIPTION} . Examples:

- feat/4_add-layout
- fix/2_change-button-b

## Commit Convention

Commits will follow the following layout:

- ISSUE_TYPE: #ISSUE_ID_1,#ISSUE_ID_2 DESCRIPTION

### examples

- git commit -m "feat: #1 init dashboard"
- git commit -m "fix: #3 button type changed"

### Code Workflow

**Info**: If you prefer using VS Code instead of the git cli that would be totally fine.

When you start your work please switch to the main branch and make sure it is up to date:

```bash
git switch main
git pull
```

Then start a new branch with:

```bash
git checkout -b feat/1_landingpage
```

**IMPORTANT**: Follow the [branch naming convention](#branch-naming-convention)

Work on your Github Issue and update the code. Then commit the code:

```bash
git add --all && git commit -m "feat: #1 init landing page" && git push
```

**IMPORTANT**: Follow the branch [commit convention](#commit-convention)
**IMPORTANT**: the `git add --all` saves a lot of time but is also a bit risky because you might check in files you don't want to check in! So before you do that command I suggest to check via VS Code which files are added and changed.

Git cli will might ask you that the remote branch needs to be created. Just follow that instruction.

## Pull Requests

### Step 1: Find something to work on

If you want to contribute a specific feature or fix you have in mind, look at active [pull
requests](https://github.com/senjun-teams/senjun-teams/pulls) to see if someone else is already working on it. If not, you can start
contributing your changes.

On the other hand, if you are here looking for an issue to work on, explore our [backlog of
issues](https://github.com/senjun-teams/senjun-teams/issues) and find something that piques your interest. We have labeled all of our
issues for easy searching.

### Step 2: Design

In some cases, it is useful to seek feedback by iterating on a design document. This is useful
when you plan a big change or feature, or you want advice on what would be the best path forward.

In many cases, the GitHub issue is sufficient for such discussions, and can be
sufficient to get clarity on what you plan to do.

### Step 3: Work your Magic

Work your magic. Here are some guidelines:

- Coding style.
  - Take a look at our [design guidelines](./DESIGN_GUIDELINES.md)
  - We have a number of linters that run during standard build that will enforce coding consistency and correctness.
    Watch out for their error messages and adjust your code accordingly.
- Every change requires a unit test
- Try to maintain a single feature/bugfix per pull request. It's okay to introduce a little bit of housekeeping
  changes along the way, but try to avoid conflating multiple features. Eventually, all these are going to go into a
  single commit, so you can use that to frame your scope.

#### Integration Tests

Integration tests perform a few functions in the CDK code base -

...

**When are integration tests required?**

The following list contains common scenarios where we _know_ that integration tests are required.
This is not an exhaustive list and we will, by default, require integration tests for all
new features unless there is a good reason why one is not needed.

- Adding a new feature

Examples:

- [integ.destinations.ts](https://github.com/aws/aws-cdk/blob/master/packages/%40aws-cdk/aws-lambda-destinations/test/integ.destinations.ts#L7)
- [integ.token-authorizer.lit.ts](https://github.com/aws/aws-cdk/blob/master/packages/%40aws-cdk/aws-apigateway/test/authorizers/integ.token-authorizer.lit.ts#L7-L12)

**What do do if you cannot run integration tests**

If you are working on a PR that requires an update to an integration test and you are unable
to to perform a real deployment, please call this out on the pull request
so a maintainer can run the tests for you.

See the [integration test guide](./INTEGRATION_TESTS.md) for a more complete guide on running
CDK integration tests.

### Step 4: Pull Request

- Create a commit with your changes and push them to a
  [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

  > Note: senjuns core members can push to a branch on the AWS CDK repo (naming convention: `<user>/<feature-bug-name>`).

- Create a [pull request on
  Github](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

- Pull request title and message (and PR title and description) must adhere to
  [conventionalcommits](https://www.conventionalcommits.org).

  - The title must begin with `feat(module): title`, `fix(module): title`, `refactor(module): title` or
    `chore(module): title`.
  - Title should be lowercase.
  - No period at the end of the title.

- Pull request message should describe _motivation_. Think about your code reviewers and what information they need in
  order to understand what you did. If it's a big commit (hopefully not), try to provide some good entry points so
  it will be easier to follow.

- Pull request message should indicate which issues are fixed: `fixes #<issue>` or `closes #<issue>`.

- Shout out to collaborators.

- Call out any new [unconventional dependencies](#adding-new-unconventional-dependencies) that are created as part of your PR.

- If not obvious (i.e. from unit tests), describe how you verified that your change works.

- If this PR includes breaking changes, they must be listed at the end in the following format
  (notice how multiple breaking changes should be formatted):

  ```
  BREAKING CHANGE: Description of what broke and how to achieve this behavior now
  * **module-name:** Another breaking change
  * **module-name:** Yet another breaking change
  ```

- Once the pull request is submitted, a reviewer will be assigned by the maintainers.

- Discuss review comments and iterate until you get at least one "Approve". When iterating, push new commits to the
  same branch. Usually all these are going to be squashed when you merge to master. The commit messages should be hints
  for you when you finalize your merge commit message.

- Make sure to update the PR title/description if things change. The PR title/description are going to be used as the
  commit title/message and will appear in the CHANGELOG, so maintain them all the way throughout the process.

#### Adding new unconventional dependencies

An unconventional dependency is defined as any dependency that is not managed via the module's `package.json` file.\*\*

Sometimes constructs introduce new unconventional dependencies. Any new unconventional dependency that is introduced needs to have
an auto upgrade process in place. The recommended way to update dependencies is through [dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates).
You can find the dependabot config file [here](./.github/dependabot.yml).

so that dependabot will automatically upgrade the version as new versions are released.

**If you think your PR introduces a new unconventional dependency, make sure to call it
out in the description so that we can discuss the best way to manage that dependency.**

### Step 5: Merge

- Make sure your PR builds successfully (we have CodeBuild setup to automatically build all PRs).
- Once approved and tested, one of our bots will squash-merge to master and will use your PR title/description as the
  commit message.

## Breaking Changes

Whenever you are making changes, there is a chance for those changes to be
_breaking_ existing users of the library. A change is breaking if there are
programs that customers could have been writing against the current version
of the CDK, that will no longer "work correctly" with the proposed new
version of the CDK.

Breaking changes require explicit callouts in the bodies of Pull Requests that introduce them.

Breaking changes come in two flavors:

- API surface changes
- Behavior changes

## Documentation

...

### Recommendations

...

## Tools (Advanced)

### Linters

All linters are executed automatically as part of the build script, `yarn build`.

They can also be executed independently of the build script. From the root of a specific package (e.g.
`packages/@aws-cdk/aws-ec2`), run the following command to execute all the linters on that package -

```bash
yarn lint
```

The following linters are used:

- [eslint](#eslint)

As working with prettier you should use:

```bash
vi ~/.config/Code/User/settings.json
```

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

VS Code has troubles to associate those multiple tsconfig files in root and subprojects like landingpage and dashboard. Therefore use [multi-root-workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) to setup sub ts projects like landingpage and dashboard

#### eslint

If you're using the VS Code and would like to see eslint violations on it, install the [eslint
extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Versioning and Release

...

## Troubleshooting

...

### I added a dependency but it's not being picked up by Visual Studio Code (I still get red underlines).

The TypeScript compiler that's running has cached your dependency tree. After re-bootstrapping,
restart the TypeScript compiler.

Hit F1, type `> TypeScript: Restart TS Server`.

## Solving Git Conflicts

If you have a conflict on your branch (usually main), we recommend using Source Control from VS Code to solve the conflict. Correct the affected conflict files directly with the editor.

## Debugging

...

If you want to run the VSCode debugger on unit tests of the CDK project
itself, do the following:

1. Set a breakpoint inside your unit test.
2. In your terminal, depending on the type of test, run either:

```bash
# (For tests names xxxx.test.ts)
$ node --inspect-brk /path/to/aws-cdk/node_modules/.bin/jest -i -t 'TESTNAME'
```

3. On the `Run` pane of VSCode, select the run configuration **Attach to NodeJS** and click the button.

## Important Repositories

- [aws-cdk](https://github.com/aws/aws-cdk): repo which is token as blue print for this repo
- [Samples](https://github.com/aws-samples/aws-cdk-examples): includes sample code in multiple languages
- [Workshop](https://github.com/aws-samples/aws-cdk-intro-workshop): source for https://cdkworkshop.com
- [Developer Guide](https://github.com/awsdocs/aws-cdk-guide): markdown source for developer guide

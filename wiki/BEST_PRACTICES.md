# BEST PRACTICES

Here will be a summary of our best practices when working in this repository.

## VS Code

We don't want to force you to work with VS Code but if you do please enable the recommended Extensions in .vscode/extensions.json .

### Linting

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

- ISSUE_TYPE: #ISSUE_ID DESCRIPTION

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

### GitHub Pull Request

If you followed the instructions from [code workflow](#code-workflow) you have now created a remote branch which is ready to be used as a Pull Request (PR).

To create the PR in GitHub go to the project root dir like https://github.com/senjun-teams/senjun-teams . Normally GitHub should already suggest you to create a PR. If not, go to Pull Requests and create your PR there.

For the **Title** of the PR try to be similar to your commit / commits for example:

```txt
feat: #1 init landing page
```

For the content of the PR the first line should be

```txt
fixes: #1
```

Then the next line should consist of important information for the reviewer. Here are some examples:

```txt
fixes: #4
* add the grid layout
* change the color of the table
```

## Solving Git Conflicts

If you have a conflict on your branch (usually main), we recommend using Source Control from VS Code to solve the conflict. Correct the affected conflict files directly with the editor.

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

## GitHub Issues

We will leverage GitHub Issues <https://github.com/senjun-teams/senjun-teams/issues> for tracking working on features, bugs or refactoring tasks. So if you want to update Code an issue for it should exist!

### Issue Types

Issue types have a related issue label to mark them as such.

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

### Bug

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

### Working on Issues

Working on Issues you are supposed to keep the normal git flow:

1. Create a local and remote branch from main with patter {ISSUE*TYPE}/{ISSUE_ID}*{DESCRIPTION} . Examples:

- feature/4_add-layout
- fix/2_change-button-b

2. Do the requested changes and push to local and remote branch. When doing your commits, keep attention to follow the [Commits](#commits) guidline.

3. Create a Pull Request (PR)
4. Ask someone for reviewing the PR.
5. When review done merge the PR and delete the branch.

### Issue Sizing

1, 2, 3, 5, 8, 13 ...

## Commits

Commits will follow the following layout:

- ISSUE_TYPE: ISSUE_ID DESCRIPTION

### Examples

- fix: #2 Changed button B
- feat: #4 I added a new layout to about side

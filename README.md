# replace this

## Linting

As working with prettier you should use:

```bash
vi ~/.config/Code/User/settings.json
```

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

VS Code has troubles to associate those multiple tsconfig files in root and subprojects like landingpage. Therefore use [multi-root-workspaces(https://code.visualstudio.com/docs/editor/multi-root-workspaces) to setup sub ts projects like landingpage

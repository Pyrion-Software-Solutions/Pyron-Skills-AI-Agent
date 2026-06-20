# Pyron Skills AI Agent

Pyron Skills AI Agent is a collection of Codex skills maintained by Pyrion Software Solutions. The first included skill is `documentation-generator`, which helps Codex generate structured Markdown documentation for source code, libraries, CLI tools, APIs, scripts, and applications.

## Included Skills

| Skill | Description |
| --- | --- |
| `documentation-generator` | Generates README files, usage guides, API references, developer docs, project structure docs, troubleshooting notes, and documentation rewrites grounded in repository contents. |

## Requirements

- Node.js 18 or newer
- npm
- Codex CLI, IDE extension, or Codex app with skills support

## Installation

Codex can load skills from two locations:

- Project-specific skills: `.codex/skills` inside a repository
- User/global skills: `~/.codex/skills`, or `$CODEX_HOME/skills` when `CODEX_HOME` is set

### Install For One Project

Run this command from the root of the project where you want the skills available:

```bash
npm exec --yes --package github:Pyrion-Software-Solutions/Pyron-Skills-AI-Agent -- pyron-skills install --project
```

This copies the skills into:

```txt
.codex/skills/
```

Project installation is the default, so this also works:

```bash
npm exec --yes --package github:Pyrion-Software-Solutions/Pyron-Skills-AI-Agent -- pyron-skills install
```

### Install Globally For Codex

Install the package globally from GitHub:

```bash
npm install -g github:Pyrion-Software-Solutions/Pyron-Skills-AI-Agent
```

Then install the skills into your Codex home:

```bash
pyron-skills install --global
```

By default, global installation copies skills into:

```txt
~/.codex/skills/
```

If `CODEX_HOME` is set, the installer uses:

```txt
$CODEX_HOME/skills/
```

## Installer Commands

List available skills:

```bash
pyron-skills list
```

Preview a project install without writing files:

```bash
pyron-skills install --project --dry-run
```

Replace an existing installed skill:

```bash
pyron-skills install --project --force
```

Install globally with overwrite enabled:

```bash
pyron-skills install --global --force
```

## Usage

After installation, start a new Codex session or reload your Codex environment so the skill list is refreshed.

Invoke the documentation skill explicitly:

```txt
Use $documentation-generator to generate a README for this project.
```

Other useful prompts:

```txt
Use $documentation-generator to create a usage guide for this CLI.
```

```txt
Use $documentation-generator to document this API module.
```

```txt
Use $documentation-generator to improve the existing README without inventing unsupported features.
```

The skill can also be selected implicitly when your request matches its description, such as asking Codex to write a README, usage guide, API reference, developer documentation, or troubleshooting notes for a repository.

## Troubleshooting

### The skill already exists

The installer refuses to overwrite existing skills by default.

Use `--force` when you want to replace the installed copy:

```bash
pyron-skills install --project --force
```

### Permission errors during global install

If `npm install -g` fails because of permissions, use your normal Node/npm version manager or configure npm's global prefix for your user account.

You can also avoid global npm installation by using the project install command with `npm exec`.

### Codex does not show the skill

Confirm the skill was copied into one of these locations:

```txt
.codex/skills/documentation-generator/SKILL.md
~/.codex/skills/documentation-generator/SKILL.md
```

Then start a new Codex session or reload the Codex surface you are using.

### Check what would be installed

Use dry-run mode:

```bash
pyron-skills install --project --dry-run
```

## Project Structure

```txt
Pyron-Skills-AI-Agent/
|-- bin/
|   `-- pyron-skills.js
|-- documentation-generator/
|   |-- SKILL.md
|   |-- agents/
|   |-- references/
|   `-- scripts/
|-- package.json
`-- README.md
```

## License

No license has been published yet.

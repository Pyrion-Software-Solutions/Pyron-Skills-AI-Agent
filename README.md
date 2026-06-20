# Pyron Skills AI Agent

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933)](package.json)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](package.json)
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey)](package.json)

Pyron Skills AI Agent packages reusable Codex skills from Pyrion Software Solutions.
The current release includes `documentation-generator`, a Markdown documentation
assistant for README files, usage guides, API references, developer notes,
troubleshooting docs, and documentation rewrites.

## Skill Catalog

| Skill | Purpose | Best for |
| --- | --- | --- |
| `documentation-generator` | Generates clear, structured Markdown documentation from source code, package metadata, existing docs, or project structure. | README files, usage guides, API references, developer documentation, CLI docs, troubleshooting notes, and doc rewrites. |

## Documentation Generator

The `documentation-generator` skill helps Codex inspect a repository before writing
docs, preserve real names and commands, and avoid inventing unsupported features.

### Supported Documentation Types

| Mode | Output |
| --- | --- |
| README | Complete project README generated from code, metadata, and existing docs. |
| Usage guide | User-facing setup, configuration, commands, examples, and troubleshooting. |
| API documentation | Function, class, module, or endpoint references with tables and examples. |
| Developer documentation | Architecture, file structure, data flow, extension points, and implementation notes. |
| Code comments | Suggested concise comments for complex or non-obvious code sections. |
| Quick summary | Compact Markdown overview for small scripts or quick handoffs. |
| Improve docs | Rewrites existing Markdown for clearer structure and more complete practical detail. |

### Included Agent Commands

| Command | Description |
| --- | --- |
| `/document-readme` | Generate a complete `README.md` from code, package metadata, existing docs, or project structure. |
| `/document-usage` | Create a usage guide focused on setup, configuration, common commands, examples, and troubleshooting. |
| `/document-api` | Build API, function, class, module, endpoint, parameter, return, and error documentation. |
| `/document-dev` | Write internal developer documentation tied to code paths and repository structure. |
| `/improve-docs` | Rewrite existing Markdown while preserving correct commands, names, paths, links, and examples. |

### Included Resources

| Path | Description |
| --- | --- |
| `documentation-generator/SKILL.md` | Main skill instructions, behavior rules, output format, and mode routing. |
| `documentation-generator/agents/` | Command-specific prompt files for README, usage, API, developer, and improvement workflows. |
| `documentation-generator/references/document-types.md` | Detailed reference for each documentation mode. |
| `documentation-generator/scripts/project_snapshot.py` | Python helper that creates a compact Markdown inventory of a repository. |

## Requirements

- Node.js 18 or newer
- npm
- Codex CLI, Codex app, IDE extension, or another Codex surface with skills support

## Installation

Codex can load skills from either a project-local skills directory or a user/global
skills directory.

### Install For One Project

Run this from the repository where you want the skills available:

```bash
npm exec --yes --package github:Pyrion-Software-Solutions/Pyron-Skills-AI-Agent -- pyron-skills install --project
```

Project installation copies skills into:

```txt
.codex/skills/
```

`--project` is the default, so this shorter command is equivalent:

```bash
npm exec --yes --package github:Pyrion-Software-Solutions/Pyron-Skills-AI-Agent -- pyron-skills install
```

### Install Globally For Codex

Install the package globally from GitHub:

```bash
npm install -g github:Pyrion-Software-Solutions/Pyron-Skills-AI-Agent
```

Then copy the skills into your Codex home:

```bash
pyron-skills install --global
```

Global installation uses:

```txt
~/.codex/skills/
```

When `CODEX_HOME` is set, the installer uses:

```txt
$CODEX_HOME/skills/
```

## CLI Reference

### Commands

| Command | Description |
| --- | --- |
| `pyron-skills list` | List installable skills in this package. |
| `pyron-skills install` | Install skills into the current project's `.codex/skills` directory. |
| `pyron-skills install --project` | Explicitly install skills for the current project. |
| `pyron-skills install --global` | Install skills into Codex home. |

### Options

| Option | Description |
| --- | --- |
| `--project` | Install into `.codex/skills` under the current working directory. |
| `--global` | Install into `~/.codex/skills` or `$CODEX_HOME/skills`. |
| `--force` | Replace an existing installed skill. |
| `--dry-run` | Show what would be installed without writing files. |
| `--list` | List installable skills during `install`. |
| `-h`, `--help` | Show CLI help. |

### Common Tasks

List available skills:

```bash
pyron-skills list
```

Preview a project install:

```bash
pyron-skills install --project --dry-run
```

Replace an existing project skill:

```bash
pyron-skills install --project --force
```

Install globally and replace existing copies:

```bash
pyron-skills install --global --force
```

## Usage With Codex

After installation, start a new Codex session or reload your Codex environment so
the skill list is refreshed.

Invoke the skill explicitly:

```txt
Use $documentation-generator to generate a README for this project.
```

Ask for a specific documentation mode:

```txt
Use $documentation-generator to create a user-facing usage guide for this CLI.
```

```txt
Use $documentation-generator to document this API module.
```

```txt
Use $documentation-generator to improve the existing README without inventing unsupported features.
```

You can also describe the documentation task naturally. Codex may select the skill
when the request matches its description, such as writing a README, generating API
docs, documenting a CLI, or improving existing Markdown.

## Release Timeline

| Version | Date | Type | Summary |
| --- | --- | --- | --- |
| `0.0.1` | 2026-06-20 | Initial release | First packaged Pyron Codex skill release with the `documentation-generator` skill and installer CLI. |

### `0.0.1` Patch Notes

Initial release of Pyron Skills AI Agent.

#### Added

- Added the `documentation-generator` Codex skill for Markdown documentation tasks.
- Added documentation modes for README files, usage guides, API references,
  developer documentation, code comments, quick summaries, and documentation
  improvements.
- Added command-specific agent prompts for `/document-readme`, `/document-usage`,
  `/document-api`, `/document-dev`, and `/improve-docs`.
- Added `references/document-types.md` as the documentation mode reference.
- Added `scripts/project_snapshot.py` to generate compact Markdown inventories of
  repositories before writing documentation.
- Added the `pyron-skills` Node.js CLI installer.
- Added project-local installation support for `.codex/skills`.
- Added global installation support for `~/.codex/skills` and `$CODEX_HOME/skills`.
- Added installer options for `--project`, `--global`, `--force`, `--dry-run`,
  `--list`, and `--help`.

#### Notes

- This is the first release baseline for the skill package.
- No Git tags are present in the repository yet. Use `v0.0.1` as the GitHub
  release tag if publishing this patch note as the initial GitHub release.

## Project Structure

```txt
Pyron-Skills-AI-Agent/
|-- bin/
|   `-- pyron-skills.js
|-- documentation-generator/
|   |-- SKILL.md
|   |-- agents/
|   |   |-- document-api.md
|   |   |-- document-dev.md
|   |   |-- document-readme.md
|   |   |-- document-usage.md
|   |   |-- improve-docs.md
|   |   `-- openai.yaml
|   |-- references/
|   |   `-- document-types.md
|   `-- scripts/
|       `-- project_snapshot.py
|-- package.json
`-- README.md
```

## Troubleshooting

| Problem | Cause | Fix |
| --- | --- | --- |
| Skill already exists | The installer will not overwrite existing skill folders by default. | Re-run with `--force`. |
| Permission error during global npm install | npm cannot write to the global package directory. | Use your Node version manager, update npm's global prefix, or install per project with `npm exec`. |
| Codex does not show the skill | The Codex session has not reloaded, or the skill was copied to the wrong path. | Confirm the install path and start a new Codex session. |
| Unsure what will be installed | You want to inspect installer output first. | Run `pyron-skills install --project --dry-run`. |

Expected skill locations:

```txt
.codex/skills/documentation-generator/SKILL.md
~/.codex/skills/documentation-generator/SKILL.md
```

## Development

Run the package check script:

```bash
npm run check
```

The check validates the Node.js installer entrypoint with `node --check`.

## Package Metadata

| Field | Value |
| --- | --- |
| Package | `pyron-skills-ai-agent` |
| Version | `0.1.0` |
| CLI binary | `pyron-skills` |
| Node engine | `>=18` |
| Repository | `Pyrion-Software-Solutions/Pyron-Skills-AI-Agent` |

## License

This package is currently marked as `UNLICENSED` in `package.json`.

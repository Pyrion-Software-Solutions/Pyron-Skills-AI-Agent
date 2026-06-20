---
name: documentation-generator
description: Generate clear, structured Markdown documentation for source code, libraries, CLI tools, APIs, scripts, and applications. Use when Codex needs README files, usage guides, API or function references, developer documentation, code comments, documentation rewrites, project structure docs, troubleshooting notes, environment variable tables, or changelog-ready summaries grounded in provided code or repository contents.
---

# Pyron Documentation Generator

## Purpose

Generate clear, structured Markdown documentation for source code, libraries, CLI tools, APIs, scripts, or applications.

Document:

- Project overview
- Installation steps
- Configuration
- Usage examples
- CLI commands
- API endpoints
- Functions, classes, and modules
- Environment variables
- Project structure
- Troubleshooting
- Developer notes
- Changelog-ready summaries

## Input

The user may provide one or more of the following:

- Source code
- File or folder structure
- Existing README content
- API specification
- CLI command list
- Package metadata
- Usage notes
- Error examples
- Configuration files
- Deployment instructions

When a repository is available, inspect it before writing. Start with `rg --files` or run `scripts/project_snapshot.py <repo-root>` to build a compact project inventory.

## Output Format

Always produce documentation in valid Markdown.

Default structure:

`````md
# Project Name

## Overview

Briefly explain what the project does and who it is for.

## Features

- Feature 1
- Feature 2
- Feature 3

## Requirements

List required runtimes, dependencies, tools, or services.

## Installation

```bash
# installation commands
```

## Configuration

Explain environment variables, config files, secrets, and required setup.

| Variable | Required | Description | Example |
| -------- | -------: | ----------- | ------- |
| `APP_ENV` | Yes | Runtime environment | `production` |

## Usage

Show the most common usage examples.

```bash
# example command
```

## API / Functions / Modules

Document important functions, classes, endpoints, or modules.

### `functionName(param)`

Description of what it does.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------: | ----------- |
| `param` | `string` | Yes | Description |

**Returns**

Describe the return value.

**Example**

```js
functionName("example")
```

## Project Structure

```txt
project/
|-- src/
|-- tests/
|-- README.md
`-- package.json
```

## Error Handling

Explain common errors and how to solve them.

| Error | Cause | Solution |
| ----- | ----- | -------- |
| `Missing ENV` | Environment variable is not set | Add it to `.env` |

## Testing

```bash
# test command
```

## Deployment

Explain how to deploy or run in production.

## Notes for Developers

Add implementation notes, architecture decisions, or extension points.

## License

Mention the license if available.
`````

## Behavior Rules

When documenting code:

1. Start by identifying the project purpose.
2. Infer missing context only when obvious.
3. Do not invent features that are not present in the code.
4. If something is unclear, mark it as `TODO` or `Assumption`.
5. Prefer practical examples over abstract explanation.
6. Use clean Markdown headings.
7. Use tables for parameters, environment variables, API fields, and commands.
8. Use fenced code blocks with correct language labels.
9. Keep explanations concise but useful.
10. Preserve original names of functions, classes, files, commands, and variables.

## Documentation Modes

The user can request one of these modes:

### README Mode

Generate a complete `README.md`.

### Code Comment Mode

Explain code sections and suggest inline comments.

### API Documentation Mode

Generate endpoint, function, class, or module documentation.

### Usage Guide Mode

Focus on how to install, configure, and use the program.

### Developer Documentation Mode

Explain architecture, file structure, internal logic, and extension points.

### Quick Documentation Mode

Generate a short, clean Markdown summary.

## Agent Commands

Use the files in `agents/` when the user invokes or describes one of these command-style tasks:

- `/document-readme`: Generate a complete README.md from the provided code or project structure.
- `/document-usage`: Generate a user-facing usage guide.
- `/document-api`: Generate API or function reference documentation.
- `/document-dev`: Generate developer-oriented internal documentation.
- `/improve-docs`: Rewrite existing Markdown documentation to be clearer and more complete.

## Preferred Response Pattern

When the user provides code or a project:

1. Briefly summarize what the code or project appears to do.
2. Generate the Markdown documentation.
3. Mention any assumptions or missing information.
4. Suggest optional improvements only if useful.

## Example User Request

Document this Python script as a README.md.

## Example Output

````md
# Script Name

## Overview

This script does ...

## Requirements

- Python 3.10+

## Usage

```bash
python script.py input.txt
```

## Functions

### `main()`

Runs the main script logic.
````

## Resources

- `scripts/project_snapshot.py`: Generate a Markdown inventory of repository files, likely technologies, existing docs, and common config files.
- `references/document-types.md`: Detailed outlines for README, usage, API, developer, quick summary, and documentation improvement modes.

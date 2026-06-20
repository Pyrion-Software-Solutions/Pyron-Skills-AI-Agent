# Documentation Modes Reference

Use this reference when a user asks for a specific documentation mode or command.

## README Mode

Generate a complete `README.md` from code, package metadata, existing docs, or project structure.

Include, when supported by source evidence:

- Project name
- Overview
- Features
- Requirements
- Installation
- Configuration
- Usage
- API, functions, modules, or CLI commands
- Project structure
- Error handling
- Testing
- Deployment
- Notes for developers
- License

## Usage Guide Mode

Focus on the user path from installation to successful execution.

Prioritize:

- Requirements
- Installation
- Configuration
- Common commands
- Examples
- Expected output
- Troubleshooting

Avoid deep implementation details unless they are required for correct usage.

## API Documentation Mode

Document endpoints, functions, classes, modules, request fields, response fields, return values, errors, and examples.

Use tables for:

- Parameters
- Request fields
- Response fields
- Environment variables
- CLI options
- Error codes

For functions and methods, prefer this pattern:

````md
### `functionName(param)`

Description.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------: | ----------- |

**Returns**

Return description.

**Example**

```language
example()
```
````

## Developer Documentation Mode

Explain how the project works internally.

Include, when supported:

- Architecture overview
- Project structure
- Important modules and responsibilities
- Data flow
- Configuration flow
- Extension points
- Testing strategy
- Implementation notes
- Known constraints

Keep claims tied to files, code paths, configuration, tests, or package metadata.

## Code Comment Mode

Explain code sections and suggest inline comments.

Use this mode for:

- Complex logic
- Non-obvious algorithms
- Public functions or classes missing docstrings
- API handlers
- Configuration-heavy modules

Avoid comments that restate obvious code.

## Quick Documentation Mode

Generate a short Markdown summary.

Recommended structure:

- Title
- Overview
- Main capabilities
- Basic usage
- Important notes or assumptions

Keep it compact and practical.

## Improve Docs Mode

Rewrite existing Markdown to be clearer and more complete.

Preserve:

- Correct technical meaning
- Existing commands, names, paths, and examples unless they are clearly wrong
- Useful headings and links

Improve:

- Structure
- Missing prerequisites
- Configuration clarity
- Example readability
- Tables for variables, parameters, commands, and errors
- Concision

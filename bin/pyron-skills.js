#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..');
const packageJson = require(path.join(packageRoot, 'package.json'));

const INTERNAL_DIRS = new Set(['.codex', '.git', 'bin', 'node_modules']);

function printHelp() {
  console.log(`pyron-skills ${packageJson.version}

Install Pyron Codex skills.

Usage:
  pyron-skills install [--project|--global] [--force] [--dry-run] [--list]
  pyron-skills list

Options:
  --project   Install into the current project: .codex/skills
  --global    Install into Codex home: ~/.codex/skills or CODEX_HOME/skills
  --force     Replace an existing installed skill
  --dry-run   Show what would be installed without writing files
  --list      List installable skills
  -h, --help  Show this help
`);
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exitCode = 1;
}

function discoverSkills() {
  return fs
    .readdirSync(packageRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !INTERNAL_DIRS.has(entry.name))
    .map((entry) => ({
      name: entry.name,
      source: path.join(packageRoot, entry.name),
    }))
    .filter((skill) => fs.existsSync(path.join(skill.source, 'SKILL.md')))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function resolveCodexHome() {
  return process.env.CODEX_HOME
    ? path.resolve(process.env.CODEX_HOME)
    : path.join(os.homedir(), '.codex');
}

function resolveInstallTarget(scope) {
  if (scope === 'global') {
    return path.join(resolveCodexHome(), 'skills');
  }

  return path.join(process.cwd(), '.codex', 'skills');
}

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, destinationPath);
    } else if (entry.isSymbolicLink()) {
      const linkTarget = fs.readlinkSync(sourcePath);
      fs.symlinkSync(linkTarget, destinationPath);
    }
  }
}

function parseInstallOptions(args) {
  const options = {
    scope: 'project',
    force: false,
    dryRun: false,
    list: false,
  };

  for (const arg of args) {
    if (arg === '--project') {
      if (options.scope === 'global') {
        throw new Error('Use only one scope flag: --project or --global.');
      }
      options.scope = 'project';
    } else if (arg === '--global') {
      if (options.scope === 'project' && args.includes('--project')) {
        throw new Error('Use only one scope flag: --project or --global.');
      }
      options.scope = 'global';
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--list') {
      options.list = true;
    } else if (arg === '-h' || arg === '--help') {
      options.help = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function printSkills(skills) {
  if (skills.length === 0) {
    console.log('No installable skills found.');
    return;
  }

  for (const skill of skills) {
    console.log(skill.name);
  }
}

function installSkills(options) {
  const skills = discoverSkills();

  if (options.list) {
    printSkills(skills);
    return;
  }

  if (skills.length === 0) {
    throw new Error('No installable skills found in this package.');
  }

  const targetRoot = resolveInstallTarget(options.scope);
  console.log(`Installing ${skills.length} skill(s) to ${targetRoot}`);

  for (const skill of skills) {
    const destination = path.join(targetRoot, skill.name);
    const exists = fs.existsSync(destination);

    if (exists && !options.force) {
      throw new Error(
        `Skill "${skill.name}" already exists at ${destination}. Re-run with --force to replace it.`
      );
    }

    if (options.dryRun) {
      console.log(`${exists ? 'Would replace' : 'Would install'} ${skill.name}`);
      continue;
    }

    if (exists) {
      fs.rmSync(destination, { recursive: true, force: true });
    }

    copyDirectory(skill.source, destination);
    console.log(`${exists ? 'Replaced' : 'Installed'} ${skill.name}`);
  }

  if (options.dryRun) {
    console.log('Dry run complete. No files were changed.');
  } else {
    console.log('Done.');
  }
}

function main() {
  const [command, ...args] = process.argv.slice(2);

  if (!command || command === '-h' || command === '--help') {
    printHelp();
    return;
  }

  if (command === 'list') {
    printSkills(discoverSkills());
    return;
  }

  if (command !== 'install') {
    throw new Error(`Unknown command: ${command}`);
  }

  const options = parseInstallOptions(args);
  if (options.help) {
    printHelp();
    return;
  }

  installSkills(options);
}

try {
  main();
} catch (error) {
  fail(error.message);
}

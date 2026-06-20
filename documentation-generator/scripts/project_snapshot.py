#!/usr/bin/env python3
"""Generate a compact Markdown inventory for documentation tasks."""

from __future__ import annotations

import argparse
import os
from collections import Counter
from pathlib import Path


IGNORE_DIRS = {
    ".git",
    ".hg",
    ".svn",
    ".idea",
    ".vscode",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".ruff_cache",
    "node_modules",
    "vendor",
    ".venv",
    "venv",
    "env",
    "bin",
    "obj",
    "dist",
    "build",
    "coverage",
    ".next",
    ".nuxt",
    "target",
}

DOC_NAMES = {
    "readme.md",
    "contributing.md",
    "changelog.md",
    "license",
    "license.md",
    "docs",
}

CONFIG_NAMES = {
    "package.json",
    "pyproject.toml",
    "requirements.txt",
    "setup.py",
    "pom.xml",
    "build.gradle",
    "build.gradle.kts",
    "cargo.toml",
    "go.mod",
    "dockerfile",
    "docker-compose.yml",
    "compose.yml",
    "makefile",
    ".env.example",
    ".env.sample",
}

EXTENSION_LABELS = {
    ".cs": "C#",
    ".css": "CSS",
    ".go": "Go",
    ".html": "HTML",
    ".java": "Java",
    ".js": "JavaScript",
    ".jsx": "React JSX",
    ".md": "Markdown",
    ".php": "PHP",
    ".ps1": "PowerShell",
    ".py": "Python",
    ".rb": "Ruby",
    ".rs": "Rust",
    ".sh": "Shell",
    ".sql": "SQL",
    ".ts": "TypeScript",
    ".tsx": "React TSX",
    ".vue": "Vue",
    ".xaml": "XAML",
    ".xml": "XML",
    ".yaml": "YAML",
    ".yml": "YAML",
}


def should_ignore(path: Path) -> bool:
    return any(part in IGNORE_DIRS for part in path.parts)


def iter_files(root: Path) -> list[Path]:
    files: list[Path] = []
    for current_root, dirs, filenames in os.walk(root):
        current = Path(current_root)
        dirs[:] = sorted(d for d in dirs if d not in IGNORE_DIRS)
        if should_ignore(current.relative_to(root)):
            continue
        for filename in sorted(filenames):
            path = current / filename
            rel = path.relative_to(root)
            if not should_ignore(rel):
                files.append(rel)
    return files


def render_file_inventory(files: list[Path], max_depth: int, max_entries: int) -> list[str]:
    shown: list[str] = []
    for rel in files:
        if len(rel.parts) > max_depth:
            continue
        shown.append(f"- `{rel.as_posix()}`")
        if len(shown) >= max_entries:
            shown.append(f"- ... truncated after {max_entries} entries")
            break
    return shown


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", nargs="?", default=".", help="Repository root to inspect")
    parser.add_argument("--max-depth", type=int, default=3, help="Maximum tree depth")
    parser.add_argument("--max-entries", type=int, default=120, help="Maximum tree entries")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists() or not root.is_dir():
        parser.error(f"Root is not a directory: {root}")

    files = iter_files(root)
    extensions = Counter(path.suffix.lower() for path in files if path.suffix)
    docs = [path for path in files if path.name.lower() in DOC_NAMES or "docs" in path.parts]
    configs = [path for path in files if path.name.lower() in CONFIG_NAMES]

    print(f"# Project Snapshot: {root.name}")
    print()
    print(f"- Root: `{root}`")
    print(f"- Files scanned: {len(files)}")
    print()

    print("## File Inventory")
    print()
    inventory = render_file_inventory(files, args.max_depth, args.max_entries)
    print("\n".join(inventory) if inventory else "_No files found._")
    print()

    print("## Likely Technologies")
    print()
    if extensions:
        for ext, count in extensions.most_common(20):
            label = EXTENSION_LABELS.get(ext, ext.lstrip(".").upper())
            print(f"- {label}: {count}")
    else:
        print("_No file extensions detected._")
    print()

    print("## Existing Documentation")
    print()
    if docs:
        for path in docs[:40]:
            print(f"- `{path.as_posix()}`")
    else:
        print("_No common documentation files detected._")
    print()

    print("## Common Config And Entrypoint Files")
    print()
    if configs:
        for path in configs[:40]:
            print(f"- `{path.as_posix()}`")
    else:
        print("_No common config files detected._")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

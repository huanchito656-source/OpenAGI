# Seed Manifest

Load seeds at task start based on your task domain.

**Always load:**

| File | Domain |
|------|--------|
| `universal.md` | Reasoning methodology, source verification, error interpretation — applies to every task |

**Select based on task:**

| File | Domain |
|------|--------|
| `coding.md` | Debugging, testing, dependencies, code structure, shared state |
| `research.md` | Source evaluation, citations, methodology, synthesis |

Load `universal.md` plus any domain seeds relevant to your task. If your task spans multiple domains, load multiple. If unsure, start with `universal.md` only and load domain seeds when you encounter domain-specific failures.

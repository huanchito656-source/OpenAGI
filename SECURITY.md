# Security

## Reporting a Vulnerability

If you discover a security issue, please report it privately via [GitHub Security Advisories](../../security/advisories/new) rather than opening a public issue.

We will respond within 72 hours and work with you to resolve the issue before any public disclosure.

## Scope

OpenAGI is a set of markdown files that instruct AI agents. There is no executable code that runs on user machines. The primary security concerns are:

- **Seed content integrity** — seeds should not contain instructions that cause agents to behave maliciously
- **Workflow security** — GitHub Actions workflows should not be vulnerable to injection via PR content
- **Payout integrity** — the contribution payout system should not be exploitable

## Out of Scope

- Vulnerabilities in the LLMs or agent frameworks that consume OpenAGI files (report those to the respective vendors)
- Social engineering attacks that don't involve the codebase

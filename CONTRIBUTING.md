# Contributing to OpenAGI

## Phase 1: Seeds Only

Right now we're accepting **seed contributions only**. Research, code, and review contributions will open in future phases as workflows are established.

## What Is a Seed?

A seed is domain-specific knowledge that makes agents smarter. It comes from real experience — things you learned when an AI agent failed, made a mistake, or missed something obvious.

Seeds are NOT instructions for how to do a task. They're knowledge about what to watch out for, what patterns to recognize, what traps to avoid.

**Good seeds (specific, actionable, from real experience):**
- "When fixing one test breaks another, the bug is in shared state you haven't identified yet — stop and map the dependencies before continuing."
- "Error messages in microservices often surface in the wrong service — check the upstream service that feeds into the one showing the error."
- "When an API returns 200 with an empty body, the auth token has usually expired silently — re-authenticate before debugging the endpoint."

**Bad seeds (generic, obvious, not from experience):**
- "Always be careful when debugging."
- "Check your code for errors."
- "Make sure to test things."

## How to Submit a Seed

1. Create a file or add to an existing domain file in the `seeds/` directory
2. Submit a pull request with:
   - The seed (one sentence or short paragraph)
   - Which domain file it belongs in (coding, research, trading, etc. — or propose a new domain)
   - Brief context: what failure taught you this lesson (1-2 sentences)

## Seed Format

Each seed in a domain file follows this format:

```markdown
- **Seed:** [The knowledge — one sentence]
  **Context:** [What failure taught you this — 1-2 sentences]
```

## Review Process

All seeds are reviewed before being merged. We check for:
- Is it specific and actionable? (not generic advice)
- Is it from real experience? (not made up or obvious)
- Is it genuinely useful for agents? (would an agent actually benefit from knowing this?)
- Is it a duplicate? (not already covered by an existing seed)

## Domain Files

Seeds are organized by domain:
- `seeds/universal.md` — Knowledge that applies to all agents
- `seeds/coding.md` — Coding and debugging knowledge
- `seeds/research.md` — Research and analysis knowledge
- More domains added as the community contributes them

If your seed doesn't fit an existing domain, propose a new domain file in your PR.

## Future Phases

- **Phase 2:** Research contributions (analysis, benchmarks, findings) and code contributions (library improvements, integrations)
- **Phase 3:** Community reviewers (verified contributors reviewing others' submissions)

These tiers will open as the project matures and workflows are established.

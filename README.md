# OpenAGI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Make any AI agent intelligent. Drop-in cognitive framework that works with any agent, any LLM. No SDK, no dependency. Just files.

---

## The Problem

Every AI agent runs the same loop: predict what to do, do it, repeat. They never predict what will HAPPEN, never check if they were right, and never revise their understanding when wrong.

Five independent mathematical proofs spanning 55 years establish that agents operating on complex multi-step tasks MUST have world models. No production agent framework has one.

## The Solution

A cognitive framework that gives any agent three things it doesn't have by default:

1. **A persistent world model** — sparse, explicit beliefs about the system, revised when wrong. Required because LLMs are stateless.
2. **Starting assumptions (seeds)** — community-contributed blind spot warnings. Mathematically proven necessary (No Free Lunch theorems).
3. **A thinking pattern** — at choice points, the agent states what it believes, predicts what will happen, compares to reality, and revises when wrong. Between choice points, it acts naturally.

One person's failure becomes a seed. Every agent benefits forever.

---

## Quick Start

Run this in your project directory:

```bash
curl -sf https://raw.githubusercontent.com/huanchito656-source/OpenAGI/main/setup.sh | bash
```

This downloads `loop.md` and `seeds/` into `.openagi/`, detects your agent, and injects the framework instructions. That's it.

### Manual setup

**1.** Copy `loop.md` and `seeds/` into a `.openagi/` directory in your project.

**2.** Add the framework instruction to your agent's config:

| Agent | Where to add it |
|-------|----------------|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/openagi.md` |
| Cline | `.clinerules` |
| Any other | System prompt |

```
Read and follow .openagi/loop.md. Load seeds at task start. Think in falsifiable beliefs.
At choice points — when uncertain, when stakes are high, when novel — state the belief,
predict, act, compare to ground truth, revise if wrong. Between choice points, act naturally.
Persist your model in understanding.md. Accumulate reasoning lessons in process.md.
```

### What happens next

The agent will:
- Load seeds — mandatory starting assumptions for its domain
- Build a sparse model of the system (`understanding.md`) — updated when beliefs change
- At choice points: predict outcomes, compare to reality, revise when wrong
- Accumulate reasoning lessons (`process.md`) that compound across sessions

---

## What the Agent Creates

| File | What it is |
|------|-----------|
| `understanding.md` | Sparse model of the system — falsifiable beliefs, revised when wrong |
| `process.md` | Lessons about the agent's own reasoning — compounds over time |

These are the agent's persistent memory. The LLM is stateless — without these files, everything learned evaporates between sessions.

---

## How Seeds Work

Seeds are domain-specific blind spot warnings from real agent failures. They tell the agent what to watch out for — not what to do. They're mathematically necessary: No Free Lunch theorems prove an agent with no starting assumptions performs no better than random.

```markdown
- **Seed:** When fixing one test breaks another, the bug is in shared state
  you haven't identified yet — stop and map the dependencies before continuing.
  **Context:** Agents oscillating between fixes that alternately break different
  tests because they don't understand how the tests are coupled.
```

Seeds also serve as **choice point detectors** — they flag situations where the agent should engage deeper thinking.

As the community grows, the seed library grows. Every new seed makes every agent smarter from startup.

---

## Repository Structure

```
├── setup.sh             One-command install script
├── loop.md              The cognitive framework — copy this into your project
├── seeds/               Domain knowledge — copy this into your project
│   ├── manifest.md      Index of available seeds
│   ├── universal.md     Methodology seeds (always loaded)
│   ├── coding.md        Coding and debugging seeds
│   └── research.md      Research and analysis seeds
│
├── research/            First-principles research behind the project
│   ├── the_finding.md
│   ├── ai_first_principles.md
│   ├── intelligence_first_principles.md
│   └── market_gap_validation.md
│
├── internal/            Project infrastructure (not part of the framework)
│   ├── scripts/         Automation (tweet bot, payout processing)
│   └── payouts/         Contribution payout ledger and config
│
├── CONTRIBUTING.md      How to submit seeds and get paid
└── LICENSE              MIT
```

**To use OpenAGI**, you only need `loop.md` and `seeds/`. Everything else is project infrastructure or research documentation.

---

## The Research

This project is backed by verified first-principles research:

- **[The Finding](research/the_finding.md)** — What's wrong with current agents and the 55 years of mathematical proof behind it
- **[AI First Principles](research/ai_first_principles.md)** — What LLMs and agents actually are
- **[Intelligence First Principles](research/intelligence_first_principles.md)** — What intelligence requires, verified against primary sources

The cognitive framework is supported by: the Good Regulator Theorem (1970), Solomonoff Induction (1964), AIXI (2000), RL sample complexity bounds (2006+), and DeepMind's constructive proof (ICML 2025: ["General Agents Need World Models"](https://arxiv.org/abs/2506.01622)). Empirical validation from [WALL-E](https://arxiv.org/abs/2410.07484) (95-98% success with the full loop) and [ForeAgent](https://arxiv.org/abs/2601.05930) (6x speedup with outcome prediction).

## Contributing

We're accepting **seed contributions** — domain-specific knowledge from real agent failures. Verified seeds earn tokens. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to submit and get paid.

If you've used an AI agent and it failed in a way that taught you something, that lesson is a seed. Submit it. Every agent using that domain benefits.

## License

MIT

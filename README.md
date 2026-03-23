# OpenAGI

The world's first decentralized agentic intelligence platform.

---

## The Problem

Every AI agent runs the same loop: predict what to do, do it, repeat. They never predict what will HAPPEN, never check if they were right, and never revise their understanding when wrong.

This is why agents fail on complex tasks. [59-minute half-life](https://arxiv.org/abs/2505.05115) on multi-step work. [95% of generative AI pilots fall short](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/) of delivering measurable impact. [18 months of model improvements produced only modest reliability gains](https://arxiv.org/abs/2602.16666). [Gartner predicts 40%+ of agentic AI projects will be canceled by 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027).

The problem isn't the LLM. It's the loop around it.

## What People Do Right Now (And Why It's Not Enough)

The best current approach is the Reflexion pattern — what the industry calls "self-improvement":

```
Act → fail → reflect on why you failed → remember the lesson → try again
```

This helps. Reflexion improved GPT-4's HumanEval pass rate from 80.1% to 91% ([paper](https://arxiv.org/abs/2303.11366)). But it has a fundamental limitation:

**Reflexion is autopsy-based.** Intelligence happens AFTER failure. The agent doesn't build understanding before acting. It doesn't predict outcomes. It doesn't question its own model of the system. It reacts to errors one at a time.

That's why it plateaus after 2-3 rounds. It memorizes specific lessons from specific failures but doesn't develop transferable understanding that prevents failures it hasn't seen yet.

The difference:

```
Reflexion: Act → fail → "what went wrong?" → remember → try again
           (learning from crashes)

What's missing: Understand → predict what will happen → act → "was I right?" → revise understanding
               (learning from testing your understanding against reality)
```

One learns from failure after the fact. The other builds and tests understanding proactively. One memorizes answers. The other learns the subject.

## The Solution

A library that plugs into any existing agent and adds the missing cognitive loop.

**Before every action:** predict the outcome.
**After every action:** compare prediction to reality.
**When wrong:** revise understanding.

Two levels:
- **System understanding** — the agent's model of the external thing it's working on
- **Process understanding** — the agent's model of its own reasoning (are my sources reliable? am I making unfounded assumptions?)

Plus a community-built seed library — domain-specific knowledge that makes agents smarter from startup. Seeds are things agents should know but don't — traps, patterns, blind spots learned from real experience.

## How It Works

```
1. Agent starts a task
2. Loads seed knowledge for the relevant domain
3. Builds understanding through the cognitive loop:
   - Predict what will happen
   - Act
   - Compare prediction to reality
   - Revise understanding when wrong
4. Seeds prevent known failures
5. New failures become new seeds for the community
```

The library enforces this loop in code. The agent can't skip the steps. Any existing harness (Claude Code, OpenClaw, Cursor, LangChain, custom) can integrate it.

## Quick Start

```python
# Coming soon
```

## Project Structure

```
core/           — The cognitive loop library
seeds/          — Community-contributed domain knowledge
research/       — First-principles research behind the project
examples/       — Working demos
```

## Contributing

Right now we're accepting **seed contributions only** — domain-specific knowledge from real agent failures. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to submit seeds.

Research, code, and review contributions will open in future phases.

## The Research

This project is backed by first-principles research documented in the `research/` directory:

- **[The Finding](research/the_finding.md)** — What's wrong with current agents and the evidence behind it
- **[AI First Principles](research/ai_first_principles.md)** — What LLMs and agents actually are
- **[Intelligence First Principles](research/intelligence_first_principles.md)** — What complex task performance requires
- **[Market Gap Validation](research/market_gap_validation.md)** — Proof that nobody has built the full cognitive loop

The cognitive loop is supported by 40+ years of cognitive science ([Soar](https://soar.eecs.umich.edu/), [ACT-R](http://act-r.psy.cmu.edu/)), mathematical proof (DeepMind ICML 2025: ["General Agents Need World Models"](https://arxiv.org/abs/2506.01622)), and research prototypes showing massive gains ([WALL-E](https://arxiv.org/abs/2410.07484) achieved 95% success with the full loop in simulated environments).

## Why Open Source

The intelligence compounds faster with more participants. If one company owns this, only their agents get smarter. If it's open, every agent gets smarter. Open source isn't philosophy here — it's an architectural requirement.

## License

MIT

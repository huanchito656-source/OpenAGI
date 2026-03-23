# The Finding

---

## The Core Claim

Current agents: **act → see what happens → maybe reflect on failure → try again**

What's missing: **understand → predict what will happen → act → compare prediction to reality → revise understanding**

Every agent today does the first. No production agent does the second. The rest of this document explains why, derives it from first principles, and documents the evidence.

---

## What an LLM Is

A function. Text in, text out. It predicts the most likely next tokens given the input tokens. It has no memory, no state, no ability to execute anything. Every call is independent. It doesn't "understand" — it pattern-matches against compressed training data. When the pattern match is good, the output looks intelligent. When the situation is novel (nothing similar in training data), it produces confident, plausible, wrong output.

A better model = better pattern matching = right more often. But the mechanism doesn't change. It's always prediction.

---

## What an Agent Is

An LLM in a while loop. The harness (regular code, not AI) sends context to the LLM, the LLM predicts an action, the harness executes it, appends the result, and loops. The LLM never executes anything — it just says what it wants to do. The harness does the work.

```
predict → act → predict → act → predict → act
```

That's the loop. Every agent product in existence — Claude Code, Cursor, Devin, OpenClaw, gstack, LangChain, CrewAI, all of them — is a variation of this loop. They differ in what tools the harness provides, what permissions it enforces, what channels it connects to, and what context it manages. But the loop is the same everywhere.

---

## What Complex Task Performance Requires

For complex, multi-step tasks — the kind agents are asked to do — prediction alone is not enough. Cognitive science ([Soar](https://soar.eecs.umich.edu/), [ACT-R](http://act-r.psy.cmu.edu/), predictive processing) and mathematical proof (DeepMind, ICML 2025: ["General Agents Need World Models"](https://arxiv.org/abs/2506.01622)) establish that generalizing agents require a loop with five steps:

1. **Perceive** — take in information about the current situation
2. **Model** — build a compressed, structured understanding of how the system works (its constraints, its causal structure, its current state)
3. **Decide** — given the model, select a strategy and predict what will happen
4. **Act** — execute
5. **Update** — compare what happened to what you predicted. If they differ, revise the model.

A system that perceives and acts but doesn't model or update is just reacting — sufficient for simple tasks, but not for complex multi-step reasoning. The update step — revising your understanding when reality disagrees with your predictions — is what produces learning, improvement, and convergence over time.

---

## The Problem

Current agents implement: **perceive (partial) → predict → act**

MODEL and UPDATE exist in severely limited forms:
- LLMs have implicit world knowledge in their weights (frozen at training time, not specific to the current task)
- Chain-of-thought provides in-context reasoning (ephemeral, lost when context resets)
- In-context learning provides bounded adaptation (non-persistent, doesn't compound)
- Reactive error correction exists (agent sees error, changes approach — but without systematic comparison of predictions to outcomes)

What's missing is not the raw capability — LLMs CAN summarize, hypothesize, compare, and revise. What's missing is the **systematic process:**

- **Production agents don't build explicit understanding.** They have implicit knowledge scattered across weights and context, but they don't articulate "here is my theory of how this system works" in a way that can be inspected, tested, or revised.

- **Production agents don't predict outcomes before acting.** They predict the next action, not the outcome of that action. Research systems do this (ForeAgent predicts outcomes to filter actions, WALL-E uses world models to anticipate state transitions), but no production agent framework includes this as a standard step.

- **Production agents don't compare predictions to reality.** When a change doesn't fix the bug, the agent reacts to the error — but it doesn't systematically ask "what did I predict would happen, what actually happened, and what does the delta tell me about my understanding?" Research systems like WALL-E do this in simulated environments, but it hasn't reached production.

- **Production agents don't systematically revise their understanding.** They change behavior reactively (try something different) rather than revising their model of the system. Reflexion revises behavior through verbal self-critique, but revising what to DO is different from revising understanding of HOW THE SYSTEM WORKS.

These gaps produce the observable problems in the space: silent failures (no expectations to compare against), error compounding (no correction mechanism), degradation on long tasks (understanding lost when context fills up), and no improvement over time (no persistent learning).

---

## The Finding

**The agent loop is incomplete for complex tasks. Nobody is addressing this.**

Research across every major framework (LangChain, CrewAI, AutoGen, LangGraph), every agent product (Claude Code, Cursor, Devin, OpenClaw), every relevant paper (Reflexion, Voyager, CoALA, WorldCoder, AdaPlanner, CLIN, WorldLLM, ForeAgent, WALL-E), and every cognitive architecture (Soar, ACT-R) found:

- The industry optimizes the predict-act loop (better prompts, more tools, bigger models, more memory)
- Research labs have built systems that partially implement the predict-compare-revise loop, but only in controlled/simulated environments — WALL-E (DeepMind, 2024) compares predicted trajectories to actual trajectories and revises rules, achieving 95% success in ALFWorld simulations. WorldLLM (2025) does Bayesian hypothesis testing in text games. ForeAgent (2026) predicts outcomes before executing in ML pipelines.
- None of these have been deployed as general-purpose production agent frameworks. The research is locked inside labs, applied to game environments, and not available as open tools.
- No production agent framework (LangChain, CrewAI, AutoGen, etc.) implements predict-compare-revise as a core architectural pattern

**Everything people try to make agents smarter (and why none of it solves the core problem):**

20 approaches analyzed. Only 3 out of 20 even predict outcomes before acting. None combine prediction, comparison, revision, community knowledge, and enforcement in code.

| Approach | Predicts before acting? | Compares to reality? | Revises understanding? |
|----------|:-:|:-:|:-:|
| Reflexion ([arXiv](https://arxiv.org/abs/2303.11366)) | No | Partial (outcome vs goal) | Partial (verbal reflection) |
| Voyager ([arXiv](https://arxiv.org/abs/2305.16291)) | No | No (goal-check only) | No (stores what worked) |
| MemGPT ([arXiv](https://arxiv.org/abs/2310.08560)) | No | No | No |
| Mem0 ([GitHub](https://github.com/mem0ai/mem0)) | No | No | Minimal (fact overwrite) |
| CLAUDE.md / context files | No | No | Very minimal |
| Agent scratchpads ([ReAct](https://arxiv.org/abs/2210.03629)) | Sometimes (informal) | Rarely | No |
| gstack skills | No | No | No |
| Self-play / self-training ([arXiv](https://arxiv.org/abs/2210.11610)) | No | No | Yes (but opaque weight updates) |
| GitHub Copilot Memory | No | No | No |
| Meta-Prompt ([arXiv](https://arxiv.org/abs/2311.12785)) | No | No | No (evolves strings) |
| ACE Framework ([GitHub](https://github.com/daveshap/ACE_Framework)) | In theory | In theory | In theory |
| ExpeL ([arXiv](https://arxiv.org/abs/2308.10144)) | No | No | Partial |
| AutoGPT / BabyAGI | No | No | No |
| CoALA ([arXiv](https://arxiv.org/abs/2309.02427)) | In theory | In theory | In theory |
| DSPy ([GitHub](https://github.com/stanfordnlp/dspy)) | No | No | No |
| Trace / OptoPrime ([arXiv](https://arxiv.org/abs/2406.16218)) | No | No | Partial (prompt params) |
| **ForeAgent** ([arXiv](https://arxiv.org/abs/2601.05930)) | **Yes** | **Yes** | **Partial** |
| **WALL-E** ([arXiv](https://arxiv.org/abs/2310.07471)) | **Yes** | **Yes** | **Yes** |
| **WorldLLM** | **Yes** | **Yes** | **Yes** |

**The pattern:** The vast majority of approaches focus on learning from failure AFTER it happens (Reflexion), storing facts (Mem0, CLAUDE.md, Copilot Memory), accumulating skills (Voyager, gstack), or optimizing prompts (Meta-Prompt, DSPy). None of them make the agent predict what will happen BEFORE acting and check if it was right.

The three that DO predict (ForeAgent, WALL-E, WorldLLM) are research prototypes in controlled environments — not production frameworks, not open source for general use, and none include community knowledge or enforce the loop in code.

**Reflexion specifically** is what the industry calls "self-improvement." It helps — GPT-4's pass rate on HumanEval went from 80.1% to 91% with Reflexion ([arXiv](https://arxiv.org/abs/2303.11366)). But it's autopsy-based. Intelligence happens AFTER failure. The agent doesn't build understanding before acting. It doesn't predict outcomes. It reacts to errors one at a time. That's why it plateaus after 2-3 iterations in practice ([practitioner analysis](https://github.com/nibzard/awesome-agentic-patterns/blob/main/patterns/reflection.md)).

The difference:
- **Everything above:** Act → see what happens → maybe reflect → try again
- **The cognitive loop:** Understand → predict what will happen → act → check if prediction was right → revise understanding

One learns from crashes. The other learns from testing understanding against reality.

The problem is clear and derived from first principles. The solution: the cognitive loop (predict-compare-revise, enforced by code) + seed knowledge (community-contributed domain expertise, see `seeds/` directory) + community refinement (failures become new seeds, ecosystem compounds).

---

## What the Solution Requires (Open Questions)

The problem is identified. The solution is not settled. Key open questions:

1. **What form should the model take?** An external file? A structured data format? Something maintained in context? Something in the harness code? Research needed.

2. **How should predictions be structured?** Free-form text? Structured assertions? Falsifiable claims with confidence levels? Research needed.

3. **How should comparison work?** LLM self-comparison (circular verification risk)? Automated testing? External validators? Research needed.

4. **Does the overhead justify the benefit?** Early experiments show the structured loop uses more turns and tokens. On tasks where predict-act already succeeds, it's pure overhead. The value must come on tasks where predict-act fails. Research needed to identify the crossover point.

5. **Does the "same LLM" problem limit the approach?** The same prediction engine that fails to model a system implicitly might also fail to model it explicitly. Does the act of externalizing and structuring actually help, or does it just transcribe the same errors into a file? Research needed.

6. **What existing work can be built on?** WorldLLM's theory-making, Reflexion's self-critique, GitHub Copilot's self-correcting memory, ACE's evolving context — these are partial solutions. How do they combine? Research needed.

---

## Why This Matters

The problem is not just "agents could be better." It's structural:

- **Scaling alone may not fix it.** Better models improve per-step prediction accuracy, but they don't add the systematic predict-compare-revise process. The improvement curve on hard benchmarks is flattening.

- **The gap gets more important over time.** As agents are asked to do longer, more complex tasks (hours-long research, multi-day projects), the absence of persistent, revisable understanding becomes more costly. Context windows grow but attention degradation remains.

- **Nobody is working on it.** The AI industry optimizes predict-act. Cognitive science has the right frameworks but isn't building agents. The gap between these communities is where the problem lives — and where the solution will come from.

---

## What This Is

An identified problem and an open research mission.

The problem: production agents lack the cognitive architecture required for complex multi-step tasks — specifically, systematic model-building, outcome prediction, prediction-reality comparison, and understanding revision.

The state of the art: research labs (DeepMind, university groups) have built systems that partially implement this in controlled environments. The research is promising (WALL-E achieved 95% success with the full loop). But it's locked inside labs, applied to game worlds, and not available as open production-ready tools.

The evidence:
- Mathematical proof: DeepMind ICML 2025 ["General Agents Need World Models"](https://arxiv.org/abs/2506.01622)
- Cognitive science: [Soar](https://soar.eecs.umich.edu/) (1983-present), [ACT-R](http://act-r.psy.cmu.edu/) (1976-present), predictive processing
- Agent half-life: [59 minutes for Claude 3.7 Sonnet on complex tasks](https://arxiv.org/abs/2505.05115) (Toby Ord, Oxford)
- Reliability stagnation: [18 months of model releases, only modest reliability improvement](https://arxiv.org/abs/2602.16666) (Princeton CITP)
- Enterprise failure: [95% of generative AI pilots fall short of measurable impact](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/) (MIT)
- Cancellation forecast: [40%+ of agentic AI projects predicted canceled by 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) (Gartner)
- Benchmark saturation: [SWE-bench Verified scores clustering at 80-81%](https://epoch.ai/benchmarks/swe-bench-verified) with top models separated by fractions of a percent
- Research prototypes: [WALL-E](https://arxiv.org/abs/2410.07484) (95% success with full loop), [ForeAgent](https://arxiv.org/abs/2601.05930) (6x speedup with prediction)

The solution: the cognitive loop (predict-compare-revise, enforced by code) + seed knowledge (community-contributed domain expertise, see `seeds/` directory) + community refinement (failures become new seeds, ecosystem compounds).

The mission: open-source what billion-dollar labs are researching behind closed doors. Build a community to push agentic intelligence from lab prototypes to production reality. Achieve AGI together, decentralized and exponentially. This is what OpenAGI exists to do.

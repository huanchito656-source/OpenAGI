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

For complex, multi-step tasks — the kind agents are asked to do — prediction alone is not enough. Five independent lines of mathematical proof, spanning 55 years, establish that agents operating on multi-step tasks MUST have world models:

1. **Good Regulator Theorem** (Conant & Ashby, 1970) — any system that optimally controls another must contain a model of it
2. **Solomonoff Induction** (1964) — optimal learning requires maintaining a distribution over world models, updated via Bayes' rule
3. **AIXI** (Hutter, 2000) — the provably optimal general agent must maintain world models and update them from experience
4. **RL Sample Complexity Bounds** (Strehl, Li, Littman, 2006) — model-based agents are provably more sample-efficient than model-free
5. **DeepMind Proof** (Richens et al., ICML 2025, [arXiv 2506.01622](https://arxiv.org/abs/2506.01622)) — multi-step goal-generalizing agents must contain world models (constructive proof with error bounds)

Additionally, the No Free Lunch theorems (Wolpert & Macready, 1997) prove that inductive biases — assumptions about which environments are more likely — are mandatory. An agent with no assumptions performs no better than random. World models encode these assumptions. They are not optional.

Neuroscience confirms this in biological intelligence: the hippocampus builds spatial models and simulates future trajectories before the animal acts (Pfeiffer & Foster, 2013). Dopamine neurons encode prediction errors that quantitatively match temporal-difference learning (Schultz, Dayan, & Montague, 1997). Prefrontal cortex encodes abstract task structure (Mante et al., 2013).

Neuroscience also establishes important constraints: internal models are sparse and task-relevant, not comprehensive replicas of the world (change blindness proves this — Simons & Chabris, 1999). Model-based and model-free processing coexist — not all behavior requires models (Daw et al., 2011; Churchland et al., 2012).

Combined with bounded rationality — the proven fact that all physical intelligence must approximate due to finite resources and intractable problems (Simon, 1955; Bylander, 1994; Roth, 1996) — this gives the complete picture:

**What complex-task intelligence requires (this project's synthesis, consistent with the proofs above):**

1. **Sparse world models** — compressed, task-relevant representations of how the system works. Not comprehensive. Only beliefs that matter.
2. **Prediction at choice points** — using the model to anticipate outcomes before acting, but not for every action. Bounded rationality means you must be selective. The neuroscience shows brains simulate at choice points (forks in the maze), not during routine traversal.
3. **Comparison to reality** — checking predictions against actual outcomes using ground truth. Prediction errors are the learning signal.
4. **Model revision** — updating the model when predictions fail. Bayesian updating is the provably optimal method (Cox, 1946; Solomonoff, 1964).
5. **Mandatory priors** — starting assumptions about the world. Without them, no better than random (NFL). Seeds, prior knowledge, and domain expertise are not optional extras.
6. **Bounded rationality** — accepting that you can't model everything. Selecting WHEN to engage deeper thinking is as important as HOW to think. This metacognitive skill — recognizing choice points — follows necessarily from finite resources + the need for models.

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
- Research labs have built systems that partially implement the predict-compare-revise loop, but only in controlled/simulated environments — WALL-E (UTS/U Maryland/Tencent, 2024; NeurIPS 2025) compares predicted trajectories to actual trajectories and revises rules, achieving 95-98% success in ALFWorld simulations. WorldLLM (2025) does Bayesian hypothesis testing in text games. ForeAgent (ZJU, 2026) predicts outcomes before executing in ML pipelines.
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
| **WALL-E** ([arXiv](https://arxiv.org/abs/2410.07484)) | **Yes** | **Yes** | **Yes** |
| **WorldLLM** | **Yes** | **Yes** | **Yes** |

**The pattern:** The vast majority of approaches focus on learning from failure AFTER it happens (Reflexion), storing facts (Mem0, CLAUDE.md, Copilot Memory), accumulating skills (Voyager, gstack), or optimizing prompts (Meta-Prompt, DSPy). None of them make the agent predict what will happen BEFORE acting and check if it was right.

The three that DO predict (ForeAgent, WALL-E, WorldLLM) are research prototypes in controlled environments — not production frameworks, not open source for general use, and none include community knowledge or enforce the loop in code.

**Reflexion specifically** is what the industry calls "self-improvement." It helps — improved code generation from 67% to ~88-91%. But it's autopsy-based. Intelligence happens AFTER failure. The agent doesn't build understanding before acting. It doesn't predict outcomes. It reacts to errors one at a time. That's why it plateaus after 2-3 rounds.

The difference:
- **Everything above:** Act → see what happens → maybe reflect → try again
- **The cognitive loop:** Understand → predict what will happen → act → check if prediction was right → revise understanding

One learns from crashes. The other learns from testing understanding against reality.

The problem is clear and derived from first principles. The mathematical proofs (5 independent results spanning 55 years) establish WHAT is needed: world models, Bayesian updating, mandatory priors. The neuroscience establishes HOW biological intelligence implements it: sparse models, prediction at choice points, prediction errors as learning signals. The solution: sparse world models + predict-compare-revise at choice points + seed knowledge (mandatory priors from community) + bounded rationality (metacognition about when to engage the full loop).

---

## What the Solution Requires (Open Questions)

The problem is identified. The core requirements are mathematically established (models, updating, priors). Key open questions remain about implementation:

1. **What form should the model take?** The math proves models must EXIST but not that they must be explicit. For LLM agents specifically, the LLM is stateless (text in, text out, no persistence), which means the model must be external — a file, a database, something outside the LLM. Making it explicit (human-readable) serves inspectability and community sharing but is an engineering choice, not a mathematical requirement.

2. **How should the agent determine choice points?** Bounded rationality means the full loop can't run on every action. The agent needs metacognition — the ability to assess its own uncertainty and engage deeper thinking when it matters. How to develop this skill in LLM agents is an open question. Seeds can flag known choice points. But novel situations require the agent to recognize them independently.

3. **How should comparison work?** LLM self-comparison risks circular verification (the same engine that made the prediction evaluates it). Ground truth from tool outputs (file contents, test results, error messages) breaks this circularity. External validators and automated testing are stronger but harder to implement.

4. **Does the overhead justify the benefit?** The full loop costs more per cycle. Bounded rationality says: only engage it when it matters. The crossover point — where the loop's benefit exceeds its cost — depends on task complexity and novelty. Simple tasks don't need it. Complex novel tasks do. Research needed to identify where the line falls.

5. **Does the "same LLM" problem limit the approach?** The same prediction engine that fails to model a system implicitly might also fail to model it explicitly. Evidence from this project's testing: explicit articulation of beliefs DOES help — it surfaces assumptions that would otherwise remain implicit and untested. But it's not a complete solution. External knowledge (seeds) and ground truth (tool outputs) are needed to break the circularity.

6. **How sparse should models be?** Neuroscience proves models should be sparse and task-relevant. Gigerenzer proved simpler models can outperform comprehensive ones in uncertain environments. But how sparse is too sparse? When does compression lose critical information? Research needed.

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

The state of the art: research labs (UTS, University of Maryland, Tencent, ZJU, DeepMind) have built systems that partially implement this in controlled environments. The research is promising (WALL-E achieved 95-98% success with the full loop). But it's locked inside labs, applied to game/simulated environments, and not available as open production-ready tools.

The evidence: 5 independent mathematical proofs spanning 55 years (Good Regulator 1970, Solomonoff 1964, AIXI 2000, RL sample complexity 2006, DeepMind 2025), neuroscience (prediction errors, hippocampal preplay, sparse models), empirical data (WALL-E 95-98% success with the full loop, ForeAgent 6x speedup), and source code analysis of every major production agent framework.

The solution: sparse world models + predict-compare-revise at choice points + mandatory priors (seeds) + bounded rationality (metacognitive selection of when to engage the full loop). For LLM agents specifically: external persistence of the model (because LLMs are stateless).

The mission: open-source what billion-dollar labs are researching behind closed doors. Build a community to push agentic intelligence from lab prototypes to production reality. Achieve AGI together, decentralized and exponentially. This is what OpenAGI exists to do.

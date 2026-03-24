# Market Gap Validation: The Model-Update Loop for LLM Agents

Does any production agent system enforce a predict-compare-revise cognitive loop — predicting outcomes before acting, comparing predictions to reality, and revising understanding when wrong? Analysis of every major agent framework, product, academic paper, cognitive architecture, and marketplace as of March 2026.

---

## The Specific Architecture Being Searched For

An agent that:
1. Builds a sparse, explicit world model of the system it's operating on (persistent across sessions)
2. Starts with mandatory priors (community-contributed domain knowledge)
3. At choice points — moments of uncertainty, high stakes, or novelty — predicts outcomes before acting
4. Compares predictions to ground truth (actual tool outputs, not self-assessment)
5. Revises the model when predictions fail
6. Accumulates metacognitive lessons about its own reasoning over time

The refined architecture (March 2026) differs from the original search in key ways: predictions happen at choice points rather than on every action (bounded rationality), models are sparse rather than comprehensive (neuroscience), and the framework is thinking-first rather than protocol-based.

---

## Verdict: Nobody Has Built This

Four independent research sweeps reached the same conclusion. The specific combination of all six properties does not exist as a framework, product, or well-known implementation anywhere in the landscape.

---

## Closest Matches (Partial Overlap)

### WorldCoder (NeurIPS 2024)
- **What it does:** Maintains an explicit external Python program as its world model (transition function + reward function). Uses LLM to synthesize and revise this code based on environment interactions. When the code can't explain observed interactions, the LLM fixes it. Uses the code model for planning (value iteration / MCTS).
- **Properties it has:** External model (1), revision based on discrepancies (5), continuous loop (6) — partially
- **Properties it lacks:** No per-action written predictions (3), no systematic prediction-vs-outcome comparison at each step (4), operates only in gridworld/game domains
- **Paper:** arxiv.org/abs/2402.12275

### AdaPlanner (NeurIPS 2023)
- **What it does:** Generates plans as Python code with assertion statements that function as predictions (e.g., "agent should be holding lettuce"). During execution, assertions are checked against actual environment state. When assertions fail ("out-of-plan feedback"), the plan is revised and execution resumes from the breakpoint.
- **Properties it has:** Explicit predictions (3), comparison to outcomes (4) — partially
- **Properties it lacks:** No persistent world model document (1), plan is task-specific not system-understanding (2), no accumulating model that grows over time (5, 6)
- **Repo:** github.com/haotiansun14/AdaPlanner

### CLIN — Continually Learning Language Agent (Allen AI, NeurIPS 2023)
- **What it does:** Maintains persistent, dynamic, textual memory of "causal abstractions" in natural language (e.g., "heating a pan SHOULD BE NECESSARY to cook an egg"). Memory is read at each trial and used by the controller. Updated at the end of each trial based on reflection.
- **Properties it has:** External model document (1), read at cycle start (2), revision based on outcomes (5) — partially
- **Properties it lacks:** No per-action predictions (3), no prediction-vs-outcome comparison (4), updates at episode end not per-step, causal abstractions describe action effects but aren't a structured system model
- **Paper:** arxiv.org/abs/2310.10134

### WebDreamer (TMLR 2025)
- **What it does:** Uses the LLM itself as a world model to simulate outcomes of candidate actions before committing. For each possible action, the agent "imagines" what would happen (as natural language), evaluates simulated outcomes, picks best action.
- **Properties it has:** Predictions before acting (3) — partially
- **Properties it lacks:** No external document (1), no persistence (2), no accumulation (5, 6), no document revision. The "world model" is the LLM's weights, not an explicit artifact.
- **Repo:** github.com/OSU-NLP-Group/WebDreamer

### Memento (2025)
- **What it does:** Maintains external Case Bank (episodic memory) of past experiences. Retrieved at each planning step. Updated via memory rewriting mechanism based on environmental feedback.
- **Properties it has:** External memory (1), read at cycle start (2), revision (5) — partially
- **Properties it lacks:** No prediction-before-acting (3), no prediction-vs-outcome comparison (4), stores experiences not a system model
- **Paper:** arxiv.org/abs/2508.16153

### Structured Cognitive Loop (SCL, 2025)
- **What it does:** Separates cognition into five phases: Retrieval, Cognition, Control, Action, Memory (R-CCAM). Memory stored externally. Intermediate results recorded and verified before actions.
- **Properties it has:** External memory (1), structured loop (6) — partially
- **Properties it lacks:** No explicit world model document, no predict-compare-revise cycle
- **Paper:** arxiv.org/abs/2510.05107

---

## Everything Else That Was Checked (And Doesn't Have It)

### Agent Frameworks
| Framework | What it has | Has model-update loop? |
|-----------|------------|----------------------|
| LangChain / LangGraph | Workflow state (typed dict with reducers), plan-and-execute template | No — state is execution state, not world model |
| CrewAI | Role-based multi-agent, task delegation | No — role prompting, no model maintenance |
| AutoGen | Multi-agent conversation, group chat | No — conversation management, no model |
| gstack (Garry Tan) | 25 skill files, linear sprint pipeline, artifact handoff | No — procedural instructions, no model or feedback loop |
| OpenClaw | Multi-channel gateway, heartbeat, RAG memory, extensive tools | No — orchestration, no model maintenance |
| AutoGPT / BabyAGI | Goal-driven loops, task lists, vector memory | No — task queue management, no model |
| MetaGPT | Software role simulation (PM, architect, engineer) | No — waterfall pipeline, no model revision |
| Semantic Kernel (Microsoft) | Plugin-based agent framework | No — tool orchestration |
| DSPy | Programmatic prompt optimization | No — prompt tuning, not model maintenance |

### Agent Products
| Product | What it has | Has model-update loop? |
|---------|------------|----------------------|
| Devin (Cognition) | Plan tracking, tool use, long-running sessions | No — plan checklist, not revisable world model |
| Cursor | Codebase indexing, AI code editing | No — codebase index is retrieval, not model |
| Claude Code | Tools, tasks, CLAUDE.md, skills | No — task tracking, not model maintenance |
| GitHub Copilot | Code completion, chat, workspace | No — retrieval-augmented completion |
| Replit Agent | Code generation, deployment | No — generate-and-iterate |

### Academic Systems
| System | What it has | Has model-update loop? |
|--------|------------|----------------------|
| Reflexion (Shinn et al.) | Verbal self-critique stored as text, read on retry | Partial — lesson-learned strings, not structured model, no predictions |
| Voyager (Wang et al.) | Persistent skill library (code), curriculum | Partial — skill accumulation, not system model |
| Stanford Generative Agents | Memory streams, reflections, planning | Partial — reflections synthesize observations, but no predict-compare cycle |
| SayCan / Inner Monologue | Grounded in real-world feedback | No — no external model document |
| LATS (Language Agent Tree Search) | MCTS with LLM evaluation | No — within-episode search, no persistent model |
| RAP (Reasoning via Planning) | LLM as world model for MCTS | No — LLM weights are the "model," not an external document |
| ChemCrow / Coscientist | Scientific tool use, hypothesis-experiment | Partial — hypothesis loop exists conceptually, but model is implicit in context |

### Classical Cognitive Architectures
| Architecture | Has model-update loop? | LLM integration? |
|-------------|----------------------|-------------------|
| Soar | Yes — full predict-compare-revise with working memory and impasse detection | No production LLM hybrid exists |
| ACT-R | Yes — declarative/procedural memory with activation-based revision | No production LLM hybrid exists |
| LIDA | Yes — "current situational model" with global workspace | No production LLM hybrid exists |
| CoALA (framework paper) | Describes what should exist — memory, reasoning, learning modules | Framework/taxonomy only, no implementation |

### YC Companies (Recent Batches)
Checked: Fixie, Lindy, MultiOn, Induced AI, Relevance AI, Dust, E2B, and others from recent batches. None implement the specific model-update architecture based on public information.

---

## Theoretical Support

### "General Agents Need World Models" (DeepMind, ICML 2025)
Proves mathematically that any agent generalizing to multi-step tasks MUST have learned a predictive environment model. This is a theoretical proof that the architecture we're describing is not optional — it's necessary for genuine generalization. But the paper proposes no implementation.
- Paper: arxiv.org/abs/2506.01622

### BDI (Belief-Desire-Intention) Architecture
Classical agent architecture from philosophy/AI that explicitly tracks beliefs. LLM implementations exist but none with the predict-compare-revise-document cycle.

### Predictive Processing / Active Inference
Neuroscience-inspired framework where agents minimize prediction error. Some 2025 papers propose LLM implementations but none ship the full architecture.
- Paper: arxiv.org/abs/2508.05766

### Dialogue State Tracking (DST)
Task-oriented dialogue systems maintain explicit belief states (structured representations of user intent). This IS explicit model maintenance with per-turn updating. But: specific to slot-filling dialogue, not general agent behavior, and no prediction-comparison mechanism. Nobody has transferred DST concepts to general LLM agent architectures.

---

## Property Coverage Matrix

| System | 1. External doc | 2. Read each cycle | 3. Write predictions | 4. Compare outcomes | 5. Revise model | 6. Continuous loop |
|--------|:-:|:-:|:-:|:-:|:-:|:-:|
| WorldCoder | Yes (Python) | Yes | No | No | Yes (partial) | Yes (partial) |
| AdaPlanner | No | No | Yes (assertions) | Yes (partial) | No (revises plan) | No |
| CLIN | Yes (text) | Yes | No | No | Yes (end of episode) | Partial |
| WebDreamer | No | No | Yes (simulations) | No | No | No |
| Memento | Yes (cases) | Yes | No | No | Yes (partial) | Partial |
| Reflexion | Yes (reflections) | Yes | No | Partial (post-hoc) | Partial | Partial |
| Soar/ACT-R | Yes (working memory) | Yes | Yes | Yes | Yes | Yes |
| **The gap** | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** |

The only systems implementing all six are classical cognitive architectures (Soar, ACT-R) that predate LLMs and have never been merged with them in a production system.

---

## Why The Gap Exists

1. **The communities haven't merged.** LLM agent builders come from ML/software engineering and think in pipelines, tools, and prompts. The predict-observe-revise loop comes from cognitive science and control theory. CoALA (Princeton, 2023) tried to bridge them but remained a taxonomy paper.

2. **Everyone iterates forward on predict-act.** The existing paradigm (predict next action → execute → predict next action) works well enough for demos and simple tasks. Teams iterate on prompts, tools, and integrations rather than questioning the fundamental loop.

3. **Better models paper over the gap.** Each time the architectural void produces failures, a stronger model comes out that fails less frequently — not because the architecture improved, but because predictions got better. This creates the illusion that scaling solves everything.

4. **Incentive structure favors shipping over rethinking.** Framework vendors (LangChain, CrewAI) benefit from adding features to the existing paradigm. A framework that restructures the loop itself would be disruptive to their model. The people best positioned to build this are least incentivized to.

5. **The solution looks "too simple."** Maintaining a markdown file and forcing the agent to revise it doesn't look like a research breakthrough. It looks like prompt engineering. The academic incentive is toward novel architectures (TTT, JEPA, Liquid Networks), not toward restructuring the workflow around existing primitives.

---

## Sources

This analysis reviewed the following categories:

**Agent frameworks:** LangChain, LangGraph, CrewAI, AutoGen, DSPy, Semantic Kernel
**Agent products:** Claude Code, Cursor, Devin, OpenClaw, gstack, GitHub Copilot
**Academic papers:** Reflexion, Voyager, CoALA, WorldCoder, AdaPlanner, CLIN, WorldLLM, ForeAgent, WALL-E, ExpeL, MemGPT, Meta-Prompt, Trace/OptoPrime, HyperAgents
**Cognitive architectures:** [Soar](https://soar.eecs.umich.edu/), [ACT-R](http://act-r.psy.cmu.edu/)
**Theoretical foundations:** [DeepMind ICML 2025](https://arxiv.org/abs/2506.01622), predictive processing, active inference
**Agent marketplaces:** GPT Store, Composio, Virtuals Protocol, Autonolas, SingularityNET
**2025-2026 developments:** WebDreamer, Memento, Structured Cognitive Loop, ACE framework, GitHub Copilot Memory

No system in any category implements the full predict-compare-revise loop as a production framework with community-contributed seed knowledge. The closest research prototypes ([WALL-E](https://arxiv.org/abs/2410.07484), [ForeAgent](https://arxiv.org/abs/2601.05930), WorldLLM) operate in controlled environments only.

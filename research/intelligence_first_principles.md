# Intelligence From First Principles

---

## Scope

This document defines intelligence for **complex, multi-step tasks** — debugging systems, conducting research, analyzing markets, planning projects. This is the domain LLM agents operate in. Simpler forms of intelligence (reactive behavior, insect navigation) may operate differently and are out of scope.

---

## The Definition

**Operational intelligence = building sparse, task-relevant models of systems, using those models to predict outcomes before acting, comparing predictions to reality, and revising the models when wrong — under bounded rationality.**

This definition is this project's synthesis. It is not attributed to any single source. It is derived from and consistent with the mathematical proofs, neuroscience, and first principles constraints documented below.

---

## Mathematical Foundations

Five independent lines of mathematical proof establish that agents operating on complex multi-step tasks MUST have world models. These are proven theorems, not opinions.

### 1. Good Regulator Theorem (Conant & Ashby, 1970)

"Every good regulator of a system must be a model of that system."

Any system that optimally controls another system must contain a mathematical homomorphism (structure-preserving mapping) of the system it controls. Proven for deterministic systems. Extended (less cleanly) to stochastic systems.

**Source:** Conant, R.C. & Ashby, W.R. "Every Good Regulator of a System Must Be a Model of That System." International Journal of Systems Science, 1(2), 1970.

**Assumptions:** Deterministic system, optimal regulation. Real agents don't achieve optimal regulation, so this proves what's required for optimality, not for "good enough."

### 2. Solomonoff Induction (Solomonoff, 1964)

The uniquely optimal method for prediction is Bayesian inference with a universal prior (weighting hypotheses by simplicity via Kolmogorov complexity). This provably converges to the true environment.

**What it proves:** Optimal learning requires maintaining a distribution over world models and updating via Bayes' rule. Simpler models should be weighted higher (Occam's razor is mathematically justified).

**Source:** Solomonoff, R. "A Formal Theory of Inductive Inference." Information and Control, 7(1-2), 1964.

**Critical limitation:** Incomputable. Computing Kolmogorov complexity requires solving the halting problem. This means the theoretically optimal learning method cannot be implemented. All real intelligence must approximate.

### 3. AIXI (Hutter, 2000/2005)

The provably optimal general agent. Selects actions that maximize expected reward over all computable environments, weighted by Solomonoff prior.

**What it proves:**
- Optimal general intelligence MUST maintain world models
- MUST update them via Bayes' rule
- MUST plan by maximizing expected reward over the model distribution
- MUST weight simpler explanations higher

**Source:** Hutter, M. "Universal Artificial Intelligence: Sequential Decisions Based on Algorithmic Probability." Springer, 2005. Also arXiv:cs/0004001.

**Critical limitations:**
- Incomputable (same as Solomonoff)
- Doesn't model itself as part of the environment (embedded agency problem)
- Horizon-dependent
- Chollet (2019, arXiv:1911.01547) argues AIXI conflates skill with intelligence — an agent that memorizes solutions scores high without being "intelligent"

### 4. RL Sample Complexity Bounds (Strehl, Li, Littman, 2006+)

Model-based reinforcement learning is provably more sample-efficient than model-free RL. Model-free approaches can require exponentially more samples to achieve the same performance.

**What it proves:** Agents with explicit models learn faster than agents without them. This is a provable efficiency advantage, not just an empirical observation.

**Source:** Strehl, A., Li, L., & Littman, M. "PAC Model-Free Reinforcement Learning." ICML 2006.

### 5. DeepMind Proof (Richens, Abel, Bellot, Everitt, 2025)

Any agent that generalizes across multi-step goals must contain a world model. Constructive proof with error bounds — they provide an algorithm that extracts the world model from the agent's policy.

**What it proves:** There is no "model-free shortcut" for multi-step generalization. The model is mathematically necessary. Better performance requires better models (error scales as O(δ/√n)).

**Does NOT apply to:** Myopic (depth-1) agents. The necessity kicks in only for multi-step planning.

**Source:** Richens, J., Abel, D., Bellot, A., & Everitt, T. "General Agents Need World Models." ICML 2025. arXiv:2506.01622.

### No Free Lunch (Wolpert & Macready, 1997)

When averaged over ALL possible problems, no algorithm outperforms any other — including random search. This proves that inductive biases (assumptions about which environments are more likely) are NECESSARY, not optional. An agent with no assumptions performs no better than random.

**What this means for intelligence:** World models encode assumptions about environment structure. NFL proves these assumptions are mandatory. You MUST have a model. There is no alternative.

**Source:** Wolpert, D. & Macready, W. "No Free Lunch Theorems for Optimization." IEEE Transactions on Evolutionary Computation, 1(1), 1997.

**Critical nuance:** NFL does NOT prove general intelligence is impossible. It proves it's impossible WITHOUT inductive biases. With the right biases (like Solomonoff's simplicity prior), general intelligence IS possible — just not over the space of ALL possible problems.

---

## Irreducible First Principles Constraints

Six constraints that ANY intelligent system must respect, proven by mathematics and physics.

### 1. Information is finite and bounded (Shannon, 1948)

No system can process or transmit more information than its channel capacity allows. Data cannot be compressed below its entropy. These are proven theorems about information itself, substrate-independent.

### 2. Computation costs energy (Landauer, 1961)

Erasing one bit requires at minimum kT·ln(2) joules. Intelligence involves irreversible computation. Therefore intelligence requires energy with a hard lower bound. Experimentally confirmed (Bérut et al., 2012).

### 3. Some problems are provably unsolvable (Turing, 1936; Gödel, 1931)

No computable system can solve the halting problem. No consistent formal system can prove its own consistency. A computable intelligent system cannot fully predict its own behavior. These are absolute mathematical barriers.

### 4. Perfect learning is impossible (Kolmogorov, 1965; Solomonoff, 1964)

Kolmogorov complexity is uncomputable. The theoretically optimal learning method (Solomonoff induction) cannot be implemented. All real intelligence must use approximations to an ideal that is provably unreachable.

### 5. Consistent uncertain reasoning must be Bayesian (Cox, 1946)

Any system of plausible reasoning satisfying basic consistency requirements must be isomorphic to probability theory (Cox's Theorem, proven). Bayes' theorem is the uniquely correct framework for updating beliefs under uncertainty. But exact Bayesian inference is intractable (#P-hard in general). So the correct method exists but cannot be exactly implemented.

### 6. All physical intelligence is bounded rational (Simon, 1955 + complexity theory)

General planning is PSPACE-complete (Bylander, 1994). Exact Bayesian inference is #P-hard (Roth, 1996). Combined with finite physical resources, this means every real intelligent system MUST use heuristics and approximations. Bounded rationality is not a design choice — it is a mathematical consequence of hard problems + finite resources.

**Key insight from Gigerenzer (1999):** Bounded rationality isn't just "doing worse with less." The right simplification can OUTPERFORM optimal procedures in uncertain environments because simpler models are less prone to overfitting.

---

## Neuroscience: What's Empirically Proven

What has actually been measured in biological intelligence, distinguishing proven findings from theoretical interpretations.

### Proven

**The brain generates predictions.**
Omission responses: neurons fire at the expected time of a stimulus that doesn't occur — genuine prediction, not just adaptation (Keller & Mrsic-Flogel, 2018). Mismatch negativity: distinct neural response to pattern violations, replicated thousands of times across labs, modalities, and species (Näätänen et al., 1978+).

**Dopamine encodes prediction errors.**
Dopamine neurons fire for unexpected rewards, pause for unexpected omissions, and shift from reward to predictive cue — quantitatively matching temporal-difference learning (Schultz, Dayan, & Montague, 1997). One of the most replicated findings in systems neuroscience. The quantitative match is tight, not metaphorical.

**The hippocampus builds spatial models and simulates future trajectories.**
Place cells map locations (O'Keefe & Dostrovsky, 1971). Grid cells provide metric coordinates (Hafting et al., 2005). Before a rat moves, hippocampal replay sweeps forward through the upcoming trajectory (Pfeiffer & Foster, 2013). At choice points, hippocampal activity alternates between possible paths — mental simulation of options (Johnson & Redish, 2007). This is direct neural evidence of model-based planning.

**PFC encodes abstract task structure.**
Population-level analysis shows PFC simultaneously encodes multiple task-relevant variables in a compositional way — effectively a low-dimensional model of task structure (Mante et al., 2013). Neurons encode abstract rules independent of specific stimuli (Wallis et al., 2001). PFC is necessary for flexible, goal-directed behavior (lesion studies, extensively replicated).

**Internal models are sparse, not comprehensive.**
Change blindness: people fail to detect large visual changes, proving the brain does NOT maintain a detailed internal model of the visual scene (Simons & Chabris, 1999). Whatever models exist are sparse and task-relevant.

**Model-based and model-free processing coexist.**
Two-step decision tasks show humans use both model-based (hippocampus, PFC) and model-free (ventral striatum) strategies simultaneously (Daw et al., 2011). Motor cortex operates as a dynamical system without explicit models (Churchland et al., 2012). The dorsal visual stream operates through direct sensorimotor coupling (Goodale & Milner, 1992).

**The same neural network handles memory and future simulation.**
The default mode network activates during both remembering past events and imagining future ones — the brain reuses memory components to construct models of future scenarios (Buckner & Carroll, 2007; Addis et al., 2007).

### Not Proven

- Full hierarchical predictive coding architecture — consistent with data but not uniquely so
- Free Energy Principle as unified theory — may be unfalsifiable at the principle level (Colombo & Wright, 2017)
- Brain implements Bayesian inference — behavior is often Bayesian-like but neural implementation unclear
- Mirror neurons underlie social understanding — mirror neurons exist but functional role contested

---

## Cognitive Science: The State of the Field

There is no unified theory of intelligence. The field is genuinely fragmented. This fragmentation reflects deep, unresolved disagreements about what intelligence IS.

### What ALL major theories agree on

1. **Intelligence is not monolithic.** Every theory distinguishes multiple components or modes.
2. **Flexible/novel processing differs from routine/automatic processing.** Whether called System 1/System 2 (Kahneman), compiled/deliberate (Soar), or procedural/declarative (ACT-R) — everyone agrees there are at least two modes.
3. **Perception and action are tightly coupled.** Even representationalist theories now accept this.
4. **Learning requires experience-dependent change in processing.**
5. **Integration of information from multiple sources matters.**

### What they irreconcilably disagree on

1. **Are internal representations necessary for intelligence?** Yes: Computational Theory of Mind, Soar, ACT-R, Predictive Processing. No: Enactivism (Varela, Thompson, Rosch, 1991), Brooks (1991). This is the deepest fault line.
2. **Is computation the right framework?** Yes: CTM, Soar, ACT-R. Partially: Predictive Processing. No: Enactivism (favors dynamical systems).
3. **Does intelligence require consciousness?** Unresolved. GWT says flexible intelligence needs it. Most architectures don't address it.

### Key architectures and their status

**Soar (Newell/Laird, 1982+):** Implemented cognitive architecture with Input-Propose-Decide-Apply-Output cycle. Learns through chunking (compiling deliberation into automatic rules). Has modeled ~600+ psychological phenomena. Weakness: no native probabilistic reasoning, relies on hand-engineered knowledge.

**ACT-R (Anderson, 1993+):** Implemented architecture with modular structure mapped to brain regions. Makes quantitative predictions of reaction times, error rates, and fMRI patterns that have been confirmed. Weakness: each task requires a new model built within the architecture.

**Predictive Processing (Friston, 2006; Clark, 2016):** The brain as prediction machine — generates top-down predictions, processes bottom-up prediction errors. Mathematically ambitious. Strong evidence at the sensory level (MMN, suppression). May be unfalsifiable at the principle level. Clark's "Surfing Uncertainty" presents the more empirically grounded version.

**Enactivism (Varela, Thompson, Rosch, 1991):** Cognition is embodied action, not computation over representations. Correctly identifies deep problems with representationalism (grounding problem, frame problem). Major weakness: no formal model, no quantitative predictions, no implemented architecture.

**Brooks' Subsumption Architecture (1986-1991):** Proved that reactive, representation-free robots can navigate real environments. Demonstrated that classical AI's dependency on world models was not necessary for insect-level behavior. Never scaled beyond reactive tasks. Brooks co-founded iRobot and directed MIT CSAIL — not a fringe position.

### Counter-arguments to the world model requirement

The mathematical proofs establish that world models are necessary for OPTIMAL multi-step agents. But:

- Brooks proved that reactive behavior doesn't need models
- Enactivists argue cognition is organism-environment coupling, not internal modeling
- The embodiment debate is unresolved — whether intelligence REQUIRES a body is a theoretical position with no formal proof

**Why these counter-arguments don't apply to LLM agents:** LLM agents operate on complex, multi-step reasoning tasks — not reactive insect-level behavior. The DeepMind proof specifically covers multi-step goal-generalizing agents. For this domain, the mathematical case for world models is proven. The counter-arguments are strongest for embodied, reactive intelligence, which is out of scope.

---

## The Synthesis

This project's synthesis, derived from the mathematical proofs, neuroscience, and first principles:

**For complex multi-step tasks, intelligence requires:**

1. **World models** — sparse, task-relevant representations of how the system works. Mathematically proven necessary (5 independent proofs). Neuroscience confirms: brains build sparse models, not comprehensive replicas.

2. **Prediction before action** — using the model to anticipate outcomes before acting. Neuroscience confirms: hippocampus simulates future trajectories before the animal moves (Pfeiffer & Foster, 2013).

3. **Comparison to reality** — checking predictions against actual outcomes using ground truth. Neuroscience confirms: dopamine prediction errors are a core neural mechanism, quantitatively matching temporal-difference learning (Schultz et al., 1997).

4. **Model revision** — updating the model when predictions are wrong. Mathematically proven optimal (Solomonoff/Bayesian updating). Neuroscience confirms: prediction errors drive learning.

5. **Bounded rationality** — all of the above must operate under finite time, finite information, and imperfect approximations. Mathematically proven (Kolmogorov uncomputability + complexity theory + finite resources). Not everything needs the full loop — routine/simple tasks can be model-free (neuroscience confirms model-based and model-free coexist).

6. **Inductive biases** — assumptions about which environments are more likely. Mathematically proven necessary (NFL theorems). An agent with no biases performs no better than random. Seeds, prior knowledge, and structural assumptions are not optional — they are mandatory.

**The five-step loop (perceive → model → decide → act → update)** is this project's operational formulation of the above. The components are proven. The specific sequential formulation is our synthesis. The loop applies in full force when tasks are novel, complex, or high-stakes. Routine tasks can operate in a lighter, model-free mode.

---

## What This Means for AI Agents

### The gap

Current production agents (Claude Code, Cursor, Devin, LangChain, CrewAI, AutoGen) implement: **predict action → execute → predict action → execute.**

The mathematical proofs say they should implement: **model → predict outcome → act → compare → revise model.**

The difference: current agents predict WHAT TO DO next. They don't predict WHAT WILL HAPPEN. They don't compare predictions to reality. They don't systematically revise their understanding when wrong.

This is verified as of March 2026 across all major production agent frameworks. No production framework implements predict-compare-revise as a core architectural pattern.

### The evidence it works

- **WALL-E** (UTS/U Maryland/Tencent, 2024; NeurIPS 2025, arXiv:2410.07484): Predicts trajectories, compares to reality, revises rules. 95-98% success on ALFWorld.
- **ForeAgent** (ZJU, 2026, arXiv:2601.05930): Predicts outcomes before executing ML pipelines. 6x speedup, +6% performance.
- **WorldLLM** (2025): Bayesian hypothesis testing in text games. Full predict-compare-revise loop.

All are research prototypes in controlled environments. None is a production framework.

### Important nuance

The mathematical proofs say models must EXIST. They do NOT say models must be EXPLICIT (as in a text file). A neural network's weights could satisfy the theorems without having anything human-readable. Making models explicit (inspectable, testable, shareable) is this project's engineering choice, motivated by practical advantages:
- Explicit models can be inspected and debugged
- Explicit models survive context compaction and session boundaries (critical for stateless LLMs)
- Explicit models can be shared across a community (seeds)
- Explicit models force the agent to articulate what it believes, making beliefs testable

This is a well-motivated engineering decision, not a mathematical requirement.

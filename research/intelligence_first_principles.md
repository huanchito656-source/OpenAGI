# Intelligence From First Principles

---

## What Intelligence Is (For Complex Tasks)

Intelligence is not IQ. IQ is one component.

For complex, multi-step tasks — debugging systems, conducting research, analyzing markets, planning projects — intelligence operates as a system, not a single capability.

**Operational intelligence = the ability to infer the structure of a system, build a model of how it works, act within it, and revise the model when reality disagrees with predictions.**

This framework comes from established cognitive science (Soar, ACT-R, predictive processing — 40+ years of research) and is mathematically supported: DeepMind proved (ICML 2025) that any agent generalizing to multi-step tasks must have a predictive model.

**Caveat:** This is not the only theory of intelligence. Some cognitive scientists (Brooks, enactivists) argue simpler forms of intelligence can emerge without internal models — direct reactive coupling between perception and action. This works for simple behaviors (insect navigation, Roomba-style robotics). For complex reasoning tasks — the kind LLM agents are asked to do — the evidence strongly supports that internal models are required. That is the domain this framework applies to.

---

## The Components

### IQ — Processing Capacity

How fast and how well your brain computes. Specifically:

- **Compression:** Turning messy, complex information into simple models
- **Pattern recognition:** Seeing structure others miss
- **Working memory:** Holding and manipulating multiple pieces of information simultaneously
- **Processing speed:** How quickly you can reason through a problem

IQ is hardware. A faster processor doesn't guarantee good software. High IQ makes it *easier* to build good models — it doesn't guarantee you will.

### First Principles — The Constraints of Reality

First principles are the actual, irreducible facts about a system. They exist independent of the observer. They don't change based on who's looking at them.

- Physics has first principles (conservation of energy, thermodynamics)
- Economics has first principles (scarcity, incentives, supply/demand)
- Crypto has first principles (immutability, permissionless, finite block space)
- AI has first principles (stateless LLM, probabilistic outputs, finite context)

First principles are not opinions, frameworks, or models. They are the constraints that any framework must respect to be correct. Getting them wrong means everything built on top is wrong.

**First principles thinking** = breaking a system down to these irreducible constraints and rebuilding understanding from there, rather than reasoning by analogy or accepting conventional explanations.

This is hard because:
- It requires ignoring what "everyone knows" and asking "what must be true?"
- It's slow (you're rebuilding from scratch instead of borrowing)
- Most education teaches you to reason from existing frameworks, not to derive your own

But it's the only way to understand something you've never seen before, or to see what everyone else is missing.

### Frameworks — Operating Strategies

Frameworks are reusable strategies for acting within the constraints that first principles define. They are derived from understanding, not given by authority.

Examples:
- Game theory (model how others will act given their incentives)
- Incentive analysis (follow the money, follow the motivation)
- Asymmetric risk (seek situations where downside is capped but upside is large)
- Opportunity cost (every choice excludes other choices)

Frameworks are not truth — they are tools. A framework works until it doesn't. The map is not the territory. Using a framework without understanding the first principles it's built on is dangerous — you won't know when it breaks.

**The relationship:** First principles tell you what's true about a system. Frameworks tell you how to operate within it. Intelligence is knowing which framework to apply, when to abandon one, and when to build a new one.

### The Loop — What Makes It Operational

For complex tasks, intelligence is not any single component. It's the loop:

1. **Perceive** — What's actually happening? (Not what you expected or wanted)
2. **Model** — What are the constraints? What causes what? (First principles)
3. **Decide** — Given this model, what's the best action? (Framework selection)
4. **Act** — Execute under uncertainty (you never have complete information)
5. **Update** — Did reality match your model? If not, fix the model. (This is where most people fail)

The speed and quality of this loop is what separates people operationally. IQ affects how fast you can run it. Discipline affects whether you actually run it. Ego affects whether you update when you're wrong.

---

## Common Failures

**High IQ, low intelligence:**
- Overthinks, overanalyzes, never acts
- Builds beautiful models but doesn't test them against reality
- Can't update because ego is attached to being right

**Low IQ, high operational intelligence:**
- Uses simple but correct frameworks
- Acts fast, observes results, adjusts
- Doesn't need to understand everything — just enough to operate

**Framework without first principles:**
- Applies rules without understanding why they work
- Can't adapt when conditions change
- Gets blindsided by situations the framework wasn't designed for

**First principles without frameworks:**
- Understands everything but can't decide or act
- Re-derives from scratch every time instead of building reusable tools
- Slow, never ships

---

## The AI Mapping

This framework maps cleanly onto AI systems because AI systems are built from the same components — just implemented differently.

| Human | AI Equivalent |
|-------|--------------|
| IQ (processing capacity) | Model capability — inference strength, compression, generalization |
| First principles (reality constraints) | Environment/task structure — external to the model, the model approximates them |
| Frameworks (operating strategies) | Learned policies/heuristics — encoded implicitly in model weights, activated by prompts |
| The loop (perceive → model → decide → act → update) | The agent harness — while loop with tools, memory, and feedback |
| Intelligence (the full system) | Does not exist in a raw LLM — requires the agent architecture |

### What a raw LLM is

A stateless function. Text in, probability distribution over next tokens out. It has no memory, no goals, no persistence. It contains compressed approximations of many frameworks (from training data), but it cannot:
- Maintain intentions across time
- Act in the world
- Update from consequences
- Choose its own objectives

A raw LLM is a **reasoning primitive** — a cognitive engine without an operator.

### What an agent is

An LLM embedded in a control loop. The harness adds:
- State (conversation history, memory)
- Goals (the user's prompt, system instructions)
- Action (tool calls — code execution, API calls, file operations)
- Feedback (tool results fed back into context)

This is what closes the perceive → model → decide → act → update loop. An agent approximates operation. A raw LLM only approximates cognition.

### What "better models" means

As models improve (more parameters, better training, better architecture), they get better at:
- Compressing complex information into useful representations
- Maintaining coherence over longer reasoning chains
- Generalizing to new problems
- Selecting better strategies from their implicit framework library

This feels like "higher IQ" because it is — the processing capacity of the cognitive engine is increasing. But it doesn't automatically produce better operation. That still requires the agent loop.

---

## The Bottom Line

For complex, multi-step tasks, intelligence is not a single number or capability. It is a system:

- **First principles** give you accurate models of reality
- **Frameworks** give you strategies for acting within those models
- **IQ/processing** determines how fast you can build and apply them
- **The loop** (act → observe → update) is what makes it operational
- **Discipline** determines whether you actually run the loop or just think about it

For AI: LLMs provide the processing and the implicit frameworks. Agents provide the loop. Neither alone is intelligent. Combined, they approximate operational intelligence — with the structural limitations documented in `unsolved_problems.md`.

# The Cognitive Loop

---

## Why This Exists

Five independent mathematical proofs establish that agents operating on complex multi-step tasks must have world models. No Free Lunch theorems prove that starting assumptions are mandatory. Bounded rationality proves that all real intelligence must approximate — you can't model everything.

This framework gives the agent three things it doesn't have by default: a persistent world model (because the LLM is stateless), starting assumptions (seeds), and a thinking pattern that catches errors before they compound.

---

## Startup

1. Read `seeds/manifest.md`. Load `seeds/universal.md` (always) and relevant domain seeds.
2. Read `understanding.md` if it exists — this is your model of the system from prior sessions. If it doesn't exist, create it after you've gathered initial context.
3. Read `process.md` if it exists — these are lessons about your own reasoning that apply across all tasks.

Seeds are your mandatory starting assumptions. Without them, you're working blind. Understanding.md is your persistent model of this specific system. Process.md is your accumulated metacognition.

---

## How to Think

Think in falsifiable beliefs. When you state something as fact — about the system, about a source, about what will happen — ask: **did I verify this or am I assuming it?**

If assuming, that's a belief. Beliefs can be wrong. The question is always: does it matter right now if this belief is wrong?

- If no → act on it. Not everything needs verification. This is bounded rationality.
- If yes → you're at a choice point. Engage deeper.

---

## Choice Points

A choice point is a moment where being wrong about a belief would change what you do next. Recognizing choice points is the core skill.

**You're at a choice point when:**
- You're uncertain about something you're about to rely on
- The stakes are high — getting this wrong is costly to undo
- The situation is novel — you haven't seen this before
- A seed flags a blind spot relevant to what you're doing
- Your conclusion contradicts something in understanding.md or process.md

**You're NOT at a choice point when:**
- You're gathering information (reading files, searching, listing)
- The action is routine and well-understood
- The cost of being wrong is trivial

### At a Choice Point

1. **State the belief.** What do you believe about this system that you're about to rely on? Say it explicitly — in your thinking, in your response. Making it explicit is what makes it testable.

2. **Predict.** Given that belief, what should happen when you act? This is your expectation. If you can't predict what will happen, your model is too vague — investigate first.

3. **Act.**

4. **Compare to ground truth.** What actually happened? Compare against real outputs — file contents, test results, error messages, actual behavior. Not against your reasoning. Ground truth is what the LLM can't hallucinate.

5. **If wrong, revise.** Which specific belief was incorrect? Update `understanding.md` with the corrected belief. If the error was in your reasoning process (not the system), add the lesson to `process.md`.

### Between Choice Points

Act naturally. Use your skills, your knowledge, your judgment. No ceremony. No file writes. No prediction format. Model-free operation is correct for routine work — brains work this way too.

---

## Managing understanding.md

Your sparse model of the system. Working memory, not total memory — the code itself is your long-term memory.

**What goes in:** Only beliefs that would change your next action if they were wrong. Falsifiable, specific, compressed.

```
- The API returns paginated results with a default limit of 20
- Module A depends on Module B through a shared Redis cache, not direct imports
- [UNCERTAIN] The auth service might cache tokens, which would explain the stale-token errors
- The CI pipeline takes ~8 minutes; tests in /integration/ require the staging DB
```

**What stays out:** Anything you can re-derive by reading the code. Obvious facts. Implementation details you're not relying on.

**When to update:** When a belief changes. Not on every action. Not on a schedule. When you learn something that corrects or adds to your model, write it down. When a belief is no longer relevant, remove it.

Mark uncertain beliefs with `[UNCERTAIN]`. These are your highest-value choice points — test them first.

---

## Managing process.md

Your model of your own reasoning. Changes slowly. Compounds across tasks and sessions.

```
## Reasoning Lessons
- [what you learned about how you think, with enough context to be useful later]

## Seed Candidates
- [lessons general enough to help ANY agent on ANY system — ready for community submission]
```

**Reasoning Lessons:** Things you learned about your own methodology.
- "I tend to trust secondary sources without checking primary — verify first"
- "When something feels obvious, that's when I skip verification and make errors"
- "I decompose systems into parts and evaluate parts in isolation — evaluate the system"

**Seed Candidates:** Lessons general enough to help other agents. When ready, submit via the GitHub issue template (`seed_submission.yml`).

Keep Reasoning Lessons compressed. When it fills up, merge related lessons and drop ones that are now obvious.

---

## When Things Keep Going Wrong

If you're repeatedly wrong in the same area, your model of that area is fundamentally broken. Stop. Don't keep patching — re-examine from scratch. Re-read the actual code or system. Rebuild understanding from primary sources.

If you're repeatedly wrong in different areas, your reasoning approach has a pattern you haven't identified. Review process.md. Look for the common thread.

If failures aren't covered by your loaded seeds, go back to `seeds/manifest.md` and load additional domain seeds. Your task may span domains you didn't initially select.

---

## At Task End

Review what happened:
- Did any beliefs turn out wrong? Is understanding.md up to date?
- Did any reasoning patterns cause errors that aren't in process.md yet? Add them.
- Are any lessons general enough to be seed candidates? Flag them to the user.

---

## Files

| File | Purpose | Persists? |
|------|---------|-----------|
| `understanding.md` | Sparse model of the system — falsifiable beliefs | Yes |
| `process.md` | Lessons about your own reasoning | Yes |
| `seeds/` | Community knowledge — mandatory starting assumptions | Yes (read only) |

# Universal Seeds

Knowledge that applies to all agents, regardless of domain.

---

## Source Reliability

- **Seed:** Blog posts and secondary sources can be outdated or wrong — verify claims against official documentation or source code before acting on them.
  **Context:** Agents frequently trust the first search result without checking primary sources, leading to actions based on incorrect information.

- **Seed:** When multiple sources contradict each other, trust the primary source (official docs, actual code) over secondary sources (blog posts, tutorials, forum answers).
  **Context:** Secondary sources interpret and can misinterpret. The primary source is the ground truth.

- **Seed:** Check the date on any source — technical information becomes outdated quickly. APIs change, libraries update, best practices evolve.
  **Context:** Agents treating a 2021 Stack Overflow answer as current truth for a library that changed its API in 2023.

## Error Interpretation

- **Seed:** Error messages often point to the symptom, not the cause — trace back to the actual source of the error before changing anything.
  **Context:** Agents repeatedly fix the file mentioned in the error when the real bug is upstream in a different module.

- **Seed:** When an action produces no error but also no expected result, the problem is usually in your assumptions about what the action does, not in the action itself.
  **Context:** Agents retrying the same action expecting different results instead of questioning whether the action does what they think it does.

## Methodology

- **Seed:** When your prediction is wrong, ask WHY before trying something different. The reason your prediction failed tells you more than the failure itself.
  **Context:** Agents that react to failures by trying random alternatives instead of understanding what the failure reveals about the system.

- **Seed:** Track what you've already tried. Repeating the same approach with minor variations wastes cycles.
  **Context:** Agents going in circles — trying fix A, then fix B, then fix A again — because they don't maintain a record of failed approaches.

- **Seed:** When you've tried three approaches and none worked, your understanding of the problem is likely wrong. Stop and reassess your mental model before trying a fourth.
  **Context:** Agents burning through dozens of iterations because they keep solving the wrong problem.

- **Seed:** Before making a change, verify you understand the current state. Don't assume — check.
  **Context:** Agents modifying code based on assumptions about what the code does without reading it first.

## Scope and Complexity

- **Seed:** When a task seems simple but keeps failing, the complexity is hidden. Look for dependencies, side effects, or assumptions you haven't identified.
  **Context:** Agents treating multi-step problems as single-step problems and being surprised when the "simple fix" doesn't work.

- **Seed:** Solving one problem can create another. After any change, verify that nothing else broke.
  **Context:** Agents fixing a bug and moving on without checking if the fix introduced a regression elsewhere.

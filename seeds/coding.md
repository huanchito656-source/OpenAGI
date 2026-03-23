# Coding Seeds

Knowledge specific to coding and debugging tasks.

---

## Testing

- **Seed:** Run tests before AND after making changes. The "before" tells you the current state. The "after" tells you if your change worked without breaking anything else.
  **Context:** Agents making changes without knowing which tests were already failing, then unable to tell if new failures are from their change or were pre-existing.

- **Seed:** When fixing one test breaks another, the bug is in shared state you haven't identified yet — stop and map the dependencies before continuing.
  **Context:** Agents oscillating between fixes that alternately break different tests because they don't understand how the tests are coupled.

- **Seed:** Test failures that only happen when tests run together (not individually) indicate shared state — a database, a global variable, a file, a mock that isn't reset between tests.
  **Context:** Agents confused by tests that pass in isolation but fail in suite, spending cycles on the test logic instead of the shared state.

## Debugging

- **Seed:** The stack trace points to where the error SURFACED, not necessarily where it ORIGINATED. Follow the data flow upstream.
  **Context:** Agents changing the function at the top of the stack trace when the actual bug is in a function that passed bad data several calls earlier.

- **Seed:** When a function returns the wrong result but the logic looks correct, check the inputs. The function may be correct but receiving bad data.
  **Context:** Agents rewriting correct functions because they assumed the inputs were right without checking.

- **Seed:** Printing or logging the actual values at each step reveals more than reading the code. What you think the code does and what it actually does can be different.
  **Context:** Agents reasoning about code behavior from reading alone when a single print statement would reveal the actual state.

- **Seed:** Off-by-one errors hide in loop boundaries, array indices, and string slicing. When values are almost-right, check the boundaries.
  **Context:** Agents looking for logic errors when the issue is a simple +1 or -1 in an index.

## Code Structure

- **Seed:** Before modifying a function, check everywhere it's called. Your change might be correct for one caller but break another.
  **Context:** Agents fixing a function for the failing test case without checking other callers that depend on the current behavior.

- **Seed:** When two modules both import the same config or constants file, changes to that file affect both — even if the modules don't directly depend on each other.
  **Context:** Agents not realizing that a "safe" config change cascades to modules they weren't thinking about.

- **Seed:** Duplicate code means duplicate bugs. If the same logic exists in two places and one has a bug, check if the other does too.
  **Context:** Agents fixing a bug in one location without searching for the same pattern elsewhere in the codebase.

## Dependencies

- **Seed:** When an error mentions a package or module you didn't touch, the issue might be in dependency versions, not in your code.
  **Context:** Agents debugging their own code when the actual problem is an incompatible dependency update.

- **Seed:** Lock files (package-lock.json, poetry.lock, etc.) exist for a reason. If tests pass in CI but fail locally, check if your local dependencies match.
  **Context:** Agents spending cycles debugging code that works fine — the environment is the problem, not the code.

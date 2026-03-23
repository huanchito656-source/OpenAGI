# Research Seeds

Knowledge specific to research and analysis tasks.

---

## Source Evaluation

- **Seed:** Academic papers are more reliable than blog posts, but check the citation count and publication venue. A preprint with zero citations is an unverified claim, not established knowledge.
  **Context:** Agents treating every arXiv paper as equally authoritative regardless of whether it's been peer-reviewed or replicated.

- **Seed:** Follow citations to primary sources. Secondary sources summarize and can distort. The original paper often says something more nuanced than the blog post describing it.
  **Context:** Agents building analysis on a blog post's interpretation of a paper rather than reading the actual paper.

- **Seed:** Look for contradicting sources, not just confirming ones. If you only find evidence that supports your thesis, you haven't searched hard enough.
  **Context:** Agents producing one-sided research by stopping at the first result that confirms the hypothesis.

- **Seed:** A single study proves nothing. Look for replication. If a finding has been reproduced by independent groups, it's more likely true.
  **Context:** Agents treating a single paper's results as definitive without checking if anyone else has verified them.

## Methodology

- **Seed:** Correlation is not causation. "X happened, then Y happened" does not mean X caused Y. Look for the mechanism.
  **Context:** Agents producing causal claims from observational data without identifying a plausible mechanism.

- **Seed:** Sample size matters. Conclusions drawn from 5 data points are not reliable. Check how much evidence a claim is based on.
  **Context:** Agents making confident assertions based on tiny datasets or a handful of examples.

- **Seed:** When statistics seem surprising, check the base rate. "50% increase" means different things when the base is 1% vs 50%.
  **Context:** Agents presenting dramatic-sounding statistics without context that reveals they're actually trivial.

- **Seed:** Absence of evidence is not evidence of absence. Not finding something in a search doesn't mean it doesn't exist — it might mean your search terms were wrong.
  **Context:** Agents concluding "nobody has done X" after a limited search when the work exists under different terminology.

## Synthesis

- **Seed:** When summarizing multiple sources, note where they agree AND where they disagree. The disagreements are often more informative than the agreements.
  **Context:** Agents producing summaries that smooth over important debates and present a false consensus.

- **Seed:** State the confidence level of your findings. "This is well-established (multiple replications)" is different from "this is one team's preliminary finding."
  **Context:** Agents presenting all findings with equal confidence regardless of the underlying evidence quality.

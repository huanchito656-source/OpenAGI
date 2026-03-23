# AI From First Principles

Everything in the AI agent space is built from a small number of primitives. This doc breaks them down.

---

## LLM

A function. Text in, text out. It has no memory, no state, no ability to execute anything. Every call is independent — it doesn't "remember" the last call. It predicts the most likely next tokens given the input tokens.

## Context Window

The size limit on how much text you can send to the LLM in one API call. The entire conversation — every message, every tool result, every response — gets re-sent on every call. When it exceeds the window, older messages must be dropped or summarized. There is no persistent memory inside the model — the "memory" is just the harness re-sending history.

## Chatbot

An LLM with a UI. A program stores your conversation history and re-sends it with each API call, creating the illusion of a continuous conversation. Under the hood, every response is generated from scratch with the full history as input.

## Agent

A chatbot where the LLM can output **tool calls** instead of just text. The key addition is a **harness** — a regular program (not AI) that wraps the LLM in a while loop:

```python
messages = [user_input]

while True:
    response = call_llm_api(messages)

    if response.has_tool_call:
        result = run_function(response.tool_call)
        messages.append(result)
        continue
    else:
        print(response.text)
        break
```

The LLM never executes anything. It outputs structured text like "call Bash('ls')". The harness reads that, actually runs `ls`, and feeds the result back as more text. The loop continues until the LLM outputs plain text with no tool calls.

**That's the entire "agent" concept.** Every agent framework, every "autonomous AI system," is some version of this while loop.

## Harness

The program wrapped around the LLM. Not AI — just code. It:
1. Sends the conversation to the LLM API (an HTTP request)
2. Reads the response
3. If it contains a tool call, executes it and loops back
4. If it's plain text, stops and shows the user

Claude Code (the product) is a harness. Claude (the model) is the LLM. The harness does the actual work — the model just says what it *wants* to do. That's why you get permission prompts — the harness is asking before executing what the model requested.

## Skills

Text files that get injected into the prompt before the LLM sees it. Not code, not plugins — just pre-written instructions.

When you run `/deploy`, the harness reads `deploy.md` and stuffs that text into the messages. The LLM reads those instructions and outputs more predictable, targeted tool calls.

Skills don't give the LLM new capabilities. They give it **instructions it already could have followed**, pre-written so you don't repeat yourself. That's why project-specific skills (referencing your actual infrastructure) are more useful than generic ones (like gstack) — they make the LLM's output actually work against your real systems.

## MCP (Model Context Protocol)

A protocol for plugging additional tools into the harness. An MCP server is a small program that exposes named functions with typed parameters:

```python
@server.tool("create_pull_request")
def create_pr(title: str, body: str, repo: str):
    return github_api.post(f"/repos/{repo}/pulls", {"title": title, "body": body})
```

Without MCP, the LLM would have to construct a bash command or curl request to hit the GitHub API. With MCP, it just calls `create_pull_request(title="fix bug", body="details")` and the MCP server handles auth, HTTP, error handling.

**Skills vs MCP:** Both achieve the same outcome. The difference is where the logic lives:
- **Skill:** Logic is in text instructions the LLM interprets. The LLM figures out *how* to do it. Can get it wrong.
- **MCP:** Logic is in code on the server. The LLM just says *what* it wants. The server figures out how. Can't be misinterpreted.

For simple stuff, skills work. For complex integrations (auth flows, pagination, binary data), MCP is more reliable.

## CLAUDE.md

Same mechanism as a skill, but always loaded — injected at the start of every conversation. Gives the LLM persistent project context so it doesn't start blind every time.

---

## Derived Concepts

### Ralph Loop

Kill the agent when context fills up, start a fresh one with the same prompt. Progress lives in files and git, not the LLM's memory. Works because the new agent can read the filesystem to see what the last one did.

```
Agent 1: reads prompt -> works -> fills context -> dies
Agent 2: reads same prompt -> reads files -> sees progress -> continues -> dies
Agent 3: reads same prompt -> reads files -> finishes task -> done
```

Named after Ralph Wiggum because it's dumb and persistent and works anyway. Only useful for development tasks where progress is measurable in files (code written, tests passing).

### Daemon

A program that runs in the background and never exits. Your FastAPI server is a daemon — it starts, listens for requests, and runs forever. OpenClaw is a daemon — the harness while loop runs on an EC2 instance, listening for Discord messages, and never exits.

### OpenClaw

A harness that:
1. Runs as a daemon instead of a CLI (the while loop never exits)
2. Accepts input from Discord instead of a terminal
3. Has no permission checks (the harness executes everything the LLM requests)
4. Has a "heartbeat" — a cron job that sends a prompt to the LLM every 30 minutes

Between Discord messages and heartbeat prompts, it's doing nothing. Just an idle process waiting for input. The 194K GitHub stars were hype — it's the same primitives as everything else, packaged differently.

### gstack

A folder of skill files (markdown prompts) for Claude Code. Not a framework, not a platform. Just pre-written instructions with aspirational branding ("virtual software development team"). Went viral because the creator (Y Combinator CEO) tweeted about it.

### Bootstrap Frameworks

Tools that analyze your codebase and auto-generate skills, CLAUDE.md, and MCP configs. They exist (Dotzlaw, ClaudeCodeBootstrap, claude-bootstrap) and solve the "drop Claude into a project and it skills itself up" problem for coding workflows. Infrastructure-aware versions (scanning your AWS/cloud resources) are emerging — Azure has an official Skills Plugin.

---

## The Bottom Line

Every product in the AI agent space is built from these primitives:
- **LLM**: text in, text out
- **Harness**: while loop that executes tool calls
- **Tools**: functions the LLM can call (built-in or via MCP)
- **Skills/Context**: text injected into prompts to guide behavior

The differences between products are:
- What tools the harness provides
- How many permission checks the harness has
- Whether the harness runs as a CLI or a daemon
- What input sources it accepts (terminal, Discord, HTTP, cron)
- How it handles context window limits

### Orchestration

Multiple harnesses coordinating with each other. Instead of one while loop calling one LLM with one set of tools, you have several, and something decides which one runs when and what data flows between them.

There's a spectrum:

1. **Deterministic orchestration** — regular code routes work between agents with if/else logic. Example: the clerk pipeline dispatcher routes Greenhouse jobs to the Greenhouse agent, Workday jobs to the Workday agent. Reliable, fast, predictable.
2. **LLM-orchestrated** — an LLM decides which agents to call, in what order, with what inputs. Flexible, but slower and less predictable.
3. **Hybrid** — deterministic routing for known cases, LLM for edge cases.

The "AI orchestration" hype is mostly #2 — using an LLM as the router/coordinator. But for most real systems, #1 or #3 is better because you don't need a probabilistic text predictor to do `if ats_type == "workday": use_workday_agent()`.

### Hosting

The harness is code, code runs on a computer, that computer costs money. That's hosting.

The decision is: how much compute does the harness need, when does it need it, and what's the cheapest way to provide that.

Examples:
- **Fargate** (clerk agents) — AWS gives you a container with CPU and RAM, bills per second. Scales to zero when idle, spins up more containers when there's work. Pay for what you use.
- **EC2** (OpenClaw) — A server that's always on, always billing, whether it's doing anything or not. $40/month to sit idle most of the time. Makes sense for daemons that need to respond instantly.
- **Your laptop** (Claude Code) — Free hosting. The harness runs locally. Dies when you close the terminal.
- **Lambda** — Runs your code only when triggered (an event, a schedule, an HTTP request). Bills per millisecond of execution. Good for heartbeat-style prompts or event-driven agents.

---

## The Bottom Line

Every product in the AI agent space is built from these primitives:
- **LLM**: text in, text out
- **Harness**: while loop that executes tool calls
- **Tools**: functions the LLM can call (built-in or via MCP)
- **Skills/Context**: text injected into prompts to guide behavior
- **Orchestration**: multiple harnesses coordinated by code or another LLM
- **Hosting**: the compute that runs the harness

The differences between products are:
- What tools the harness provides
- How many permission checks the harness has
- Whether the harness runs as a CLI or a daemon
- What input sources it accepts (terminal, Discord, HTTP, cron)
- How it handles context window limits
- How multiple agents are coordinated
- Where and how the harness is hosted

That's it. There is no magic. The entire industry is packaging these same primitives differently.

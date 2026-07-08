---
title: Server Detail View & Token Estimator
section: Browsing Capabilities
order: 3
description: >-
  Connection status, the full capability list, and a context-budget card
  estimating the token cost of a server's tool/resource/prompt definitions.
---

Selecting a server in the sidebar opens its **detail view** — a single place
to see everything about that server's connection and capabilities at a
glance.

## What's in the detail view

- **Connection status and actions** — current state
  (connected/disconnected/connecting), plus controls to disconnect,
  reconnect, or remove the server.
- **Full capability list** — every tool, resource, and prompt the server
  exposes, without needing to expand the sidebar tree.
- **Auth panel** (OAuth-protected servers only) — token status, expiry, and
  scopes; see
  [Authentication & OAuth 2.1](/docs/connecting-to-servers/authentication-oauth).
- **Context-budget card** — see below.

## Context-budget card

The context-budget card estimates how many **tokens** the server's tool,
resource, and prompt _definitions_ would consume if loaded into a model's
context window — before you've even made a single call.

This matters because every tool/resource/prompt a client connects to has a
schema and description that gets sent to the model as part of its context,
whether or not the model ever calls it. A server with many verbose tool
definitions can quietly eat a large chunk of a model's context budget.

The card breaks this down **segment by segment**:

- Cost per tool definition (name, description, input schema)
- Cost per resource definition
- Cost per prompt definition
- A running total for the whole server

## Why it's useful

- **Designing servers** — if you're authoring an MCP server, this tells you
  how "expensive" your tool definitions are to a model before you ship
  them, so you can trim verbose descriptions or overly complex schemas.
- **Evaluating third-party servers** — before wiring an external server
  into a production agent, check how much of your context budget it will
  consume just by being connected, independent of actual usage.
- **Comparing servers** — if choosing between two servers with similar
  functionality, the context-budget card gives a concrete number to
  compare.

## Related

- This estimates the cost of **definitions only**. The cost of an
  individual tool call's **response** is shown separately — see
  [Per-Call Token Footprint](/docs/invoking-tools-and-prompts/token-footprint).
- Estimation uses [gpt-tokenizer](https://github.com/niieani/gpt-tokenizer);
  actual token counts may vary slightly by the model you ultimately use in
  production.

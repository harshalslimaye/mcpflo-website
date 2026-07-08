---
title: Per-Call Token Footprint
section: Invoking Tools & Prompts
order: 4
description: >-
  The Tokens tab on every result shows what that specific call costs in
  context-window terms.
---

Every result in MCPFlo carries a **Tokens tab**, showing what that specific
call costs in context-window terms — separate from the context-budget
estimate for the tool's _definition_ (see
[Server Detail View & Token Estimator](/docs/browsing-capabilities/server-detail-view)).

## What it measures

The Tokens tab on a given result breaks down two figures:

- **Response cost** — how many tokens the content returned by this call
  would consume if fed into a model's context (text, JSON, or any other
  content block in the result).
- **Definition cost** — a reminder of what the tool's own
  schema/description costs just by being connected, shown alongside the
  response so you can see both sides of the ledger for that capability in
  one place.

## Why per-call, not just per-tool

A tool's _definition_ cost is fixed — it's paid once, just by connecting to
the server. But its _response_ cost varies every time you call it,
depending on the arguments you pass and what the server returns. A
`search` tool called with a broad query might return a huge result; the
same tool called with a narrow one might return almost nothing. The
per-call footprint lets you see that variance directly, call by call.

## Why it's useful

- **Sizing responses before production use** — if you're about to wire a
  tool into an agent, check whether a typical call returns a response that
  fits comfortably in your context budget, or whether it needs
  pagination/truncation on the server side.
- **Debugging bloated responses** — if an agent using this server is
  burning through context unexpectedly, replay the same call in MCPFlo (see
  [Replaying Past Calls](/docs/history-and-workflow/replaying-past-calls))
  and check its token footprint directly.
- **Comparing arguments** — try the same tool with different inputs to see
  how the response size (and cost) changes.

## How it's calculated

Token counts are estimated using
[gpt-tokenizer](https://github.com/niieani/gpt-tokenizer). Since MCPFlo has
no model in the loop, this is always an **estimate** — actual token usage
may differ slightly depending on the specific model and tokenizer used in
production.

## Related

- See
  [Understanding Responses](/docs/invoking-tools-and-prompts/understanding-responses)
  for how the underlying content is rendered.
- See
  [Server Detail View & Token Estimator](/docs/browsing-capabilities/server-detail-view)
  for the fixed, per-server definition cost this complements.

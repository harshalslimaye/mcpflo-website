---
title: Sampling
section: Invoking Tools & Prompts
order: 7
description: >-
  Servers can ask the client to run a model completion on their behalf;
  MCPFlo surfaces the request and lets you type the response by hand.
---

**Sampling** is the reverse relationship of elicitation: instead of asking
the _user_ something, the server asks the _client_ to run an LLM completion
on its behalf via `sampling/createMessage` — useful for servers whose tools
need a model's help to finish a task (e.g. summarizing a large document as
an intermediate step).

## How it works elsewhere

In a normal AI-integrated client, a sampling request would be forwarded to
the connected model, which generates a completion that's sent back to the
server to continue its work — entirely automated, with real model calls and
real token cost.

## How MCPFlo handles it

MCPFlo has **no model in the loop** by design, so instead of calling an LLM
automatically:

1. The server sends a `sampling/createMessage` request, including the
   message(s) it wants completed and any generation parameters.
2. MCPFlo surfaces this request to **you** directly — showing what the
   server is asking a model to do.
3. You type the response by hand, exactly as if you were the model.
4. MCPFlo sends your typed response back to the server as the sampling
   result, and the tool call continues.

## Why this matters

- **Deterministic, token-free testing** — you can exercise a server's
  sampling-dependent tools without spending real model tokens or getting
  non-deterministic output, which makes it easy to test specific scenarios
  (e.g. "what happens if the model says X").
- **Full visibility into what's being asked** — you see the exact
  prompt/messages the server constructs for the model, which is useful for
  verifying the server builds sensible sampling requests before it's ever
  wired into a real client.
- **Testing edge cases** — you can deliberately type unusual, malformed, or
  edge-case responses to see how the server handles them, something that's
  hard to force reliably from a real model.

## Related

- See [Elicitation](/docs/invoking-tools-and-prompts/elicitation) for the
  reverse direction — a server asking the user something directly rather
  than asking for a model completion.
- See
  [Live Notifications](/docs/invoking-tools-and-prompts/live-notifications)
  for other server-to-client communication that can occur mid-call.
- The bundled test server, `@mcpflo/server-everything`, includes a tool
  exercising sampling.

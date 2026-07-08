---
title: Elicitation
section: Invoking Tools & Prompts
order: 6
description: >-
  Servers can pause a tool call to ask the user for more information;
  MCPFlo renders these requests as an interactive form.
---

**Elicitation** lets a server pause a tool call mid-execution to ask the
_user_ for more information, rather than failing outright or guessing at a
missing value. MCPFlo renders these requests as an interactive form, right
inside the call flow.

## How it works

1. You invoke a tool as usual (see
   [Schema-Driven Invocation Forms](/docs/invoking-tools-and-prompts/invocation-forms)).
2. Mid-call, the server sends an `elicitation/create` request — declaring a
   JSON Schema for the information it needs, plus a message explaining why.
3. MCPFlo pauses the call and renders the requested schema as a form, along
   with the server's message.
4. You fill in the form and submit — MCPFlo sends your answer back to the
   server as the elicitation response.
5. The server resumes the tool call using your answer, and the final result
   renders as normal.

## Example use case

A `deploy` tool might elicit confirmation before proceeding ("Deploy to
production? This will affect live traffic.") or ask for a missing parameter
it couldn't infer (e.g. which environment to target), rather than requiring
every possible parameter up front.

## What's supported

- **Form-mode elicitation** — the server declares a schema, MCPFlo renders
  a form, you submit structured data back. This is fully supported.

## What's not supported

- **URL-mode elicitation** — where a server directs the user to complete an
  action in a browser rather than filling out an inline form — is **not
  currently supported**.

## Why this matters for testing

Elicitation is one of the trickier parts of the MCP protocol to get right
as a server author — it requires correctly pausing execution, waiting for a
response, and resuming with the right state. MCPFlo lets you exercise this
flow directly and confirm:

- The elicited schema renders and validates correctly.
- Your response is correctly incorporated into the tool's continued
  execution.
- The tool's final result reflects the elicited value as expected.

## Related

- See [Sampling](/docs/invoking-tools-and-prompts/sampling) for the reverse
  case — a server asking the _client_ to run a model completion, rather
  than asking the user a direct question.
- The bundled test-fixture server, `@mcpflo/server-everything`, includes a
  tool that exercises elicitation — a good way to see this flow working
  before testing your own server.

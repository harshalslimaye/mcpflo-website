---
title: Live Notifications
section: Invoking Tools & Prompts
order: 5
description: >-
  Progress updates and log messages a server emits while a call is still in
  flight.
---

MCP tool calls aren't always a simple request-then-response — a server can
emit **notifications** while a call is still in flight, such as progress
updates or log messages. MCPFlo captures these and surfaces them alongside
the call, in real time.

## What gets captured

- **Progress notifications** — incremental updates a server sends for
  long-running operations (e.g. "processing file 3 of 10").
- **Log messages** — diagnostic or informational messages a server emits
  during execution, independent of the final result.

## Where they show up

Every in-flight (and completed) tool call has a **notifications tab**,
separate from the response view. As notifications arrive, they're appended
live to this tab — you don't need to refresh or wait for the call to
finish to see them.

## Why this matters

- **Visibility into long-running tools** — for a tool that takes several
  seconds or longer, progress notifications tell you it's actually working
  rather than stuck.
- **Debugging server behavior** — log messages emitted mid-call can reveal
  what a server is doing internally, useful when a call fails or returns
  unexpected results and the final response alone doesn't explain why.
- **Matches real client behavior** — since a production AI client would
  also receive and (ideally) surface these notifications, seeing them in
  MCPFlo helps you verify a server's notification behavior is correct
  before it reaches a real integration.

## Related

- See
  [Schema-Driven Invocation Forms](/docs/invoking-tools-and-prompts/invocation-forms)
  for how a call is initiated.
- See
  [Understanding Responses](/docs/invoking-tools-and-prompts/understanding-responses)
  for how the final result (as opposed to in-flight notifications) is
  rendered.
- See [Elicitation](/docs/invoking-tools-and-prompts/elicitation) and
  [Sampling](/docs/invoking-tools-and-prompts/sampling) for other ways a
  server can communicate with the client mid-call, beyond simple
  notifications.

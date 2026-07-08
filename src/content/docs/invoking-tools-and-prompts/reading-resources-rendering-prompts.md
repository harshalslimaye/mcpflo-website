---
title: Reading Resources & Rendering Prompts
section: Invoking Tools & Prompts
order: 2
description: >-
  Fetch a resource's contents or expand a prompt into its rendered message
  turns.
---

Tools aren't the only capability you can invoke in MCPFlo — resources and
prompts have their own interaction patterns, distinct from a tool call.

## Reading resources

A **resource** is data the server can hand over, identified by a URI —
reading one has no side effects, it's a pure fetch.

1. Select a resource in the capability tree.
2. MCPFlo requests its contents from the server.
3. The result renders based on content type:
   - **Text** resources render as readable text (with syntax highlighting
     where applicable).
   - **Binary** resources (images, audio, etc.) render using the same rich
     rendering as tool responses — see
     [Understanding Responses](/docs/invoking-tools-and-prompts/understanding-responses).
4. The raw JSON-RPC response is always available if you need to inspect it
   directly.

Resources can also appear **embedded or linked** inside a tool's
response — in that case, MCPFlo renders them inline as part of the result,
without you needing to navigate to the resource separately.

## Rendering prompts

A **prompt** is a reusable, parameterized template for a conversation —
MCPFlo lets you expand one to see exactly what message turns it would
produce.

1. Select a prompt in the capability tree.
2. If the prompt declares named arguments, a form renders for you to fill
   them in (schema-driven, same as tool inputs).
3. Submit the form — MCPFlo requests the rendered prompt from the server.
4. The response shows the **expanded message turns** (e.g.
   system/user/assistant messages) exactly as the server constructed them,
   with each turn's role and content clearly labeled.

This is useful for verifying a prompt template behaves correctly — that
arguments are substituted properly, roles are assigned as expected, and the
resulting conversation shape matches what you intended before wiring it
into a real client.

## Related

- See
  [Understanding Responses](/docs/invoking-tools-and-prompts/understanding-responses)
  for how different content types (text, JSON, images, audio) are rendered
  once a resource or prompt call returns.
- See
  [Per-Call Token Footprint](/docs/invoking-tools-and-prompts/token-footprint)
  for how much context budget a given resource read or prompt render
  consumes.

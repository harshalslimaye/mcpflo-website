---
title: Understanding Responses
section: Invoking Tools & Prompts
order: 3
description: >-
  How MCPFlo renders content blocks — JSON tree, images, audio, embedded
  resources, and mixed content.
---

Every tool call, resource read, or prompt render in MCPFlo returns one or
more **content blocks**, and MCPFlo renders each block according to its
type — so you see the response the way it's meant to be read, not just as
raw text.

## Content block types

**Text**
Rendered as plain, readable text.

**JSON**
Pretty-printed with a collapsible **tree view** — expand/collapse nested
objects and arrays to navigate large payloads without scrolling through a
wall of text.

**Images**
Rendered inline as actual images, not base64 strings.

**Audio**
Rendered with an inline player.

**Embedded / linked resources**
Resources referenced from within a response (see
[Reading Resources & Rendering Prompts](/docs/invoking-tools-and-prompts/reading-resources-rendering-prompts))
render inline using the same type-aware rendering as a direct resource
read.

## Mixed content

A single response can contain multiple content blocks of different
types — for example, a tool that returns an explanatory text block followed
by an image. MCPFlo renders **mixed content inline**, in the order the
server returned it, rather than forcing you to pick one view.

## Raw view

However a response is rendered, the **full JSON-RPC envelope** is always
available as a raw view — useful when you need to see exactly what the
server sent at the protocol level (headers, IDs, error objects, etc.),
independent of how MCPFlo chose to display it.

## Why this matters

Rich, type-aware rendering means you can verify a server's output is
correct at a glance — spotting a malformed image, garbled JSON, or missing
field — without needing to decode or format the raw response yourself.

## Related

- See
  [Per-Call Token Footprint](/docs/invoking-tools-and-prompts/token-footprint)
  for how a response's size translates into context-window cost.
- See
  [Live Notifications](/docs/invoking-tools-and-prompts/live-notifications)
  for output that arrives _during_ a call rather than as the final
  response.

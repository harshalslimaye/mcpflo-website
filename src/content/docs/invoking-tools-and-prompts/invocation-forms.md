---
title: Schema-Driven Invocation Forms
section: Invoking Tools & Prompts
order: 1
description: >-
  MCPFlo generates a live, validated form from a tool's JSON Schema instead
  of a raw JSON payload.
---

When you select a tool to invoke, MCPFlo doesn't ask you to hand-write a
JSON payload — it generates a form directly from the tool's declared **JSON
Schema**, so you fill in fields the same way you'd fill out any form.

## How it works

Every MCP tool declares an `inputSchema` describing the shape of the
arguments it accepts. MCPFlo renders this schema as a live form using
[react-jsonschema-form (RJSF)](https://rjsf-team.github.io/react-jsonschema-form/):

1. Select a tool in the capability tree.
2. Its input schema renders as a form — text fields, numbers, booleans,
   enums/dropdowns, and so on, matching the schema's declared types.
3. Fill in the fields and click **Invoke** (or equivalent) to send the call.

## Nested objects and arrays

Tools with more complex inputs are fully supported:

- **Nested objects** render as collapsible sub-sections matching the
  schema's structure.
- **Arrays** render with **add/remove controls**, so you can build up a
  list of items (including arrays of objects) without editing raw JSON.

## Validation

Forms validate **client-side** against the schema before a call goes out:

- Required fields are enforced.
- Type mismatches (e.g. text in a number field) are caught immediately.
- Constraints declared in the schema (e.g. enums, min/max, patterns) are
  respected.

This catches malformed input before it reaches the server, so you spend
less time debugging whether a failure is your input or the server's
behavior.

## When a schema is missing or minimal

If a tool declares a very loose schema (e.g. an open-ended object with no
properties), the generated form will be correspondingly minimal — MCPFlo
renders exactly what the schema describes, no more and no less.

## After invoking

Once you invoke a tool, its result renders in the response view — see
[Understanding Responses](/docs/invoking-tools-and-prompts/understanding-responses) —
and the call is added to that tool's history, ready to replay later (see
[History & Workflow](/docs/history-and-workflow/call-history)).

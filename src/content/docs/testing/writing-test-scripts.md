---
title: Writing Test Scripts for Tools, Resources, and Prompts
navLabel: Writing Test Scripts
section: Testing
order: 1
description: >-
  Attach a small JavaScript test script to any tool, resource, or prompt to
  assert on its result, Bruno-style, and re-run it on every call.
---

MCPFlo lets you attach a **test script** to any tool, resource, or prompt —
a small piece of JavaScript that asserts on the result of a call,
Bruno-style. Instead of just eyeballing a response, you can write
repeatable checks ("the response contains X", "responded in under 500ms",
"no error was returned") and re-run them every time you invoke that
capability.

## Where it lives

Every tool, resource, and prompt detail view has a **Tests** tab (alongside
Params/Saved/Schema/Tokens for tools, similarly for resources and prompts).
Open it, write a script, and it autosaves as you type.

## What a script looks like

```js
test('responds with a greeting', () => {
  expect(res.getText()).to.include('Hello')
})

test('completes quickly', () => {
  expect(res.responseTime).to.be.below(500)
})

test('no error returned', () => {
  expect(res.isError).to.equal(false)
})
```

- **`test(name, fn)`** registers one named check. A script can declare as
  many as you like; each is reported pass/fail independently.
- **`expect(...)`** (and `assert`) is [Chai](https://www.chaijs.com/)'s
  assertion library — the full BDD `expect` API is available.
- **`res`** is the result of the most recent call to this capability — see
  [The Scripting API](/docs/testing/scripting-api) for its full shape.

## When scripts run

- **Manually** — write/edit the script, then invoke the capability again
  (or replay a past call); the result view's **Tests** tab shows the
  pass/fail summary for that specific run.
- **In bulk** — from the server-level **Tests** tab, via **Run all
  tests**, or one capability at a time — see
  [The Server-Level Tests Tab](/docs/testing/server-level-tests-tab).

## Why this exists

Browsing a response and eyeballing correctness works for a one-off check,
but doesn't scale as you iterate on a server: a test script turns "does
this still work" into a repeatable, one-click question. Combined with
**Saved Requests** (a named argument set you can mark for automated runs —
see [Saved Requests](/docs/testing/saved-requests)), a tool can be tested
end-to-end — fixed inputs, asserted outputs — without a full external test
framework.

## What it's not

- **Not a replacement for the app's own dev/unit tests** (Vitest,
  Playwright) — those test MCPFlo itself; this tests _MCP servers_ you
  connect to, from inside the app.
- **Not networked or filesystem-capable** — scripts run in an isolated
  sandbox and can only see the call result you're testing against (see
  [The Scripting API](/docs/testing/scripting-api)).

## Related

- See [The Scripting API](/docs/testing/scripting-api) for the full `res`
  contract per capability kind.
- See [Saved Requests](/docs/testing/saved-requests) for supplying fixed
  arguments a test can run against automatically.
- See [Running Tests per Capability](/docs/testing/running-tests-per-capability)
  for what the result view shows after a run.

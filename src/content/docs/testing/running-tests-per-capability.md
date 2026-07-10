---
title: Running Tests per Capability
section: Testing
order: 4
description: >-
  The Tests tab on a tool, resource, or prompt — writing, autosaving, and
  reading results for a single call.
---

Each tool, resource, and prompt's own **Tests** tab is where you write and
run a script against that specific capability, one call at a time.

## Writing and autosaving

Open the Tests tab and type a script into the editor (syntax-highlighted,
CodeMirror-based). There's no explicit save button:

- Edits **autosave** 500ms after you stop typing.
- If you switch to a different tool/prompt/resource — or close the app —
  **before** that debounce window elapses, the in-progress edit is
  **flushed immediately on unmount**, so nothing is lost. This matters
  more than it might sound: each detail view remounts on every capability
  switch, so "unmount" happens on every tab switch, not just on app
  close.

## Running the script

A test script runs against **the result of your most recent call** to
that capability — there's no separate "run tests" action distinct from
invoking the capability itself:

1. Write your script.
2. Invoke the capability (or replay a past call from history).
3. The result view's **Tests** tab shows the pass/fail summary for that
   specific call's result.

If you haven't saved a script yet, the Tests tab shows a prompt instead of
an empty summary: _"Write a test script on the Tests tab, then run the
call again to see results here."_

## Reading the results

- **Summary line** — `Tests (n)`, with passed/failed counts.
- **Per-test rows** — each `test()` call is one row: a colored dot (green
  = pass, red = fail) plus its name. A failing test with a message and/or
  actual/expected values expands (click to toggle) to show them side by
  side; a passing test — or a failure with no extra detail, like a plain
  thrown string — has nothing to expand, so no chevron is shown.
- **Script error banner** — shown separately from pass/fail rows when the
  _script itself_ didn't run to completion (a syntax error, a timeout, an
  out-of-memory abort). Any `test()` calls that did complete before the
  failure still appear below it — a script error doesn't discard partial
  results.
- **Console section** — collapsed by default, showing everything the
  script passed to `console.log/info/warn/error`, in call order. Omitted
  entirely if the script logged nothing.
- **"Ran but called no test()"** — if the script executed cleanly but
  never called `test()`, the tab says so explicitly rather than showing
  an empty "0 of 0 passed" summary.

## Related

- See [The Scripting API](/docs/testing/scripting-api) for what you can
  write in the script itself.
- See [The Server-Level Tests Tab](/docs/testing/server-level-tests-tab)
  for running this same script in bulk, across every capability on a
  server.
- Scripts run under a timeout and memory limit — either one being
  exceeded is what produces a script error instead of a pass/fail result.

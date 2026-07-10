---
title: The Server-Level Tests Tab
section: Testing
order: 5
description: >-
  Run every scripted capability on a server in bulk, with per-capability
  status and an aggregate pass/fail summary.
---

Alongside a server's Overview and Capabilities tabs, the server detail
view has a **Tests** tab — a single place to see every capability with a
saved test script and run them in bulk, without opening each
tool/resource/prompt individually.

## Layout

Capabilities are grouped the same way the Capabilities tab groups them —
**Tools**, **Resources**, **Prompts** — with each group collapsed into its
own card, showing only capabilities that have a saved script participating
meaningfully (capabilities without one still appear, marked accordingly).

## Per-capability status

Each row shows one of:

| Status | Meaning |
|---|---|
| **No test script** | This capability has no saved script yet |
| **Not tested** | A script exists, but hasn't been run this session |
| **Running…** | A run is currently in progress |
| **Skipped — needs input** | Auto-run couldn't derive valid arguments (see below) |
| **N passed** / **M failed** | Result of the most recent run this session |

Clicking an expandable row (one with a completed run) reveals the same
per-test pass/fail rows used in the individual capability's own Tests tab.

## Running tests

- **Run all tests** — a single button runs every capability that has a
  saved script, using each one's marked **Saved Request** (or schema
  defaults) to supply arguments.
- **Per-row Run** — a play icon next to any scripted row runs just that
  one capability.

## Where arguments come from for an automated run

Since a bulk run has no live form to pull values from, MCPFlo derives
arguments automatically:

1. Start from the tool's/prompt's schema defaults.
2. Overlay the capability's Saved Request marked **"use for tests"**, if
   one exists (see [Saved Requests](/docs/testing/saved-requests)) — the
   marked request's values win per field; schema defaults still fill in
   anything it doesn't cover.
3. Check that every **required** field now has a value.

If required fields still can't be satisfied this way, the capability is
reported **"Skipped — needs input"** rather than invoked with guessed or
missing values — hovering the status explains: _"Save a request on its
Saved tab and mark it 'Use for tests'."_

## Aggregate summary

Once at least one capability has a completed run this session, the tab
header shows a running total — `N tests`, passed, failed — aggregated
across every capability on **this server** that's finished a run. It
stays hidden (not "0 of 0") until the first run completes, so it never
misrepresents an unstarted state as a clean pass.

## Related

- See [Saved Requests](/docs/testing/saved-requests) for how a request
  gets marked to feed automated runs.
- See [Running Tests per Capability](/docs/testing/running-tests-per-capability)
  for the underlying per-capability Tests tab and result rendering this
  reuses.
- See [Custom Tests Folder](/docs/testing/custom-tests-folder) for where
  the scripts these rows check for actually live.

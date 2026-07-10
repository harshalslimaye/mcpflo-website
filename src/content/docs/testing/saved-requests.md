---
title: Saved Requests
section: Testing
order: 3
description: >-
  Save a named set of arguments for a tool or prompt, and mark one to feed
  automated test runs.
---

A **Saved Request** is a named set of arguments for a tool or prompt,
stored independently of any live call — so you can build up a small
library of inputs worth re-running, without retyping them every time.

## Where it lives

Every tool and prompt detail view has a **Saved** tab, alongside
Params/Schema/Tokens/Tests.

## Saving a request

From the Params tab's footer, next to **Execute**, click **Save**. A small
popover asks for a name (defaults to "Request N" if left blank) —
confirm, and the current form values are saved as a new entry on the
Saved tab.

## Managing saved requests

Each row on the Saved tab supports:

- **Load** — populate the Params form with this request's saved
  arguments.
- **Rename** — inline rename, committed on blur or Enter.
- **Edit** — expand the row to reveal the same form used on Params, bound
  to this request's own argument values; edits autosave (debounced)
  independently of the live Params form, so editing a saved request never
  affects — or is affected by — whatever's currently in the Params tab.
- **Delete** — removes the entry.

## Marking a request for automated test runs

Exactly one saved request per capability can be marked **"use for
tests"** (via a star toggle on its row). This is the argument set the
server-level **Tests** tab uses when running that capability
automatically — since a bulk "run all tests" pass has no live form to
pull values from, it needs _some_ fixed input to call the capability
with.

- Only **one** request can be marked at a time — marking a different one
  automatically unmarks the previous.
- If **no** request is marked, the automated run falls back to schema
  defaults alone. If required fields still can't be satisfied that way,
  the capability is reported as **"skipped — needs input"** rather than
  guessed at (see [The Server-Level Tests Tab](/docs/testing/server-level-tests-tab)).
- Marking is a discrete action (persisted immediately), unlike argument
  edits, which are debounce-autosaved.

## What's stored

For each tool/prompt, saved requests are written to a `.requests.json`
file (see [Where Test Files Live on Disk](/docs/testing/where-test-files-live-on-disk)):

```json
{
  "requests": [
    { "id": "…", "name": "Happy path", "args": { "query": "hello" }, "createdAt": 0, "updatedAt": 0 }
  ],
  "testRequestId": "…"
}
```

`args` holds raw form values as entered — for a prompt, this is **not**
the wire-format string map sent to the server, since a saved request
needs to round-trip cleanly back into the form on Load.

## Related

- See [The Server-Level Tests Tab](/docs/testing/server-level-tests-tab)
  for how a marked request feeds an automated "run all tests" pass.
- See [Where Test Files Live on Disk](/docs/testing/where-test-files-live-on-disk)
  for the on-disk file format and location.
- See [The Scripting API](/docs/testing/scripting-api) for what a test
  script sees once a saved request's args produce a call result.

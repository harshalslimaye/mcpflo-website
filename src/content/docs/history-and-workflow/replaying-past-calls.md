---
title: One-Click Replay
navLabel: Replaying Past Calls
section: History & Workflow
order: 2
description: >-
  Replay any past call directly from history — the form prefills with its
  exact parameters, ready to tweak or run as-is.
---

Rather than re-filling out a form from scratch to repeat a call, MCPFlo lets
you replay any past call directly from history with a single click.

## How it works

1. Open the history for a capability (or the **All** tab — see
   [Call History](/docs/history-and-workflow/call-history)).
2. Click/activate a history entry.
3. The invocation form **prefills** with that entry's exact
   parameters — ready to tweak or run as-is.
4. Click **Invoke** again to re-run the call.

## Why this matters

- **Fast iteration** — if you're debugging a server and need to run the
  same call repeatedly after each change, replay skips re-typing the
  arguments every time.
- **Tweak-and-rerun** — since the form prefills rather than just executing
  blindly, you can adjust one field (e.g. try a different value) and
  immediately see how the result changes, without starting from a blank
  form.
- **Reproducing issues** — if a past call produced an unexpected result,
  replaying it is the fastest way to confirm the issue is still present
  after a server-side fix.

## Notes

- Replay reuses the **parameters**, not the previous **result** — invoking
  again always sends a fresh request to the server and produces a new
  response (and a new history entry).
- Since history is non-persistent (see
  [Call History](/docs/history-and-workflow/call-history)), replay is only
  available for calls made in the current session.

## Related

- See [Call History](/docs/history-and-workflow/call-history) for how
  entries are recorded and retained.
- See
  [Schema-Driven Invocation Forms](/docs/invoking-tools-and-prompts/invocation-forms)
  for how the prefilled form behaves once populated.

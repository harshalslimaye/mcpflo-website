---
title: Call History
section: History & Workflow
order: 1
description: >-
  Per-capability call history, up to 50 entries, plus a unified All tab —
  cleared when the app closes.
---

Every call you make in MCPFlo — whether invoking a tool, reading a
resource, or rendering a prompt — is recorded in a lightweight history, so
you can look back at what you ran without redoing the work from scratch.

## Per-capability history

Each individual tool, resource, or prompt keeps its **own history**, capped
at the **50 most recent calls**. Selecting a capability shows its history
alongside its invocation form, so you can see past runs in context without
leaving the view.

## The "All" tab

Alongside per-capability history, a unified **All** tab aggregates every
call across every connected server into a single, cross-server activity log
for the current session — useful for reviewing everything you've done
recently, regardless of which capability or server it belonged to.

## What's recorded

For each history entry:

- The arguments/parameters used for the call
- The full response (or error) that came back
- Enough context to identify which server and capability it belongs to
  (relevant in the **All** tab)

## Non-persistent by design

History is **cleared when the app closes** — it does not persist to disk
across sessions. This is a deliberate limitation (see README's "Not
supported" list): history is meant as a working scratchpad for your current
testing session, not a permanent audit log.

If you need to preserve a specific result long-term, copy it out of the raw
JSON-RPC view (see
[Understanding Responses](/docs/invoking-tools-and-prompts/understanding-responses))
rather than relying on history to still be there next time you open the
app.

## Related

- See
  [Replaying Past Calls](/docs/history-and-workflow/replaying-past-calls)
  for re-running a past call directly from history.
- See
  [Reading Resources & Rendering Prompts](/docs/invoking-tools-and-prompts/reading-resources-rendering-prompts)
  for what gets recorded when the capability isn't a tool.

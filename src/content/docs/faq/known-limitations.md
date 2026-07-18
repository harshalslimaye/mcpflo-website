---
title: Known Limitations
section: FAQ & Troubleshooting
order: 2
description: >-
  No SSE, no persistent history, macOS arm64-only — the deliberate scope
  limitations of MCPFlo, in one place.
---

MCPFlo is deliberately scoped: it's a focused tool for testing MCP servers,
not a general-purpose client. This page collects the limitations you're
most likely to run into, with links to the detailed docs for each. Most of
these are design decisions rather than missing features — where something
is planned, the entry says so.

## No SSE transport

MCPFlo supports **stdio** and **Streamable HTTP** only. The older HTTP+SSE
transport — deprecated in the MCP spec and superseded by Streamable HTTP —
is intentionally not implemented. A server that only speaks SSE cannot be
added.

See
[Supported vs. Unsupported Transports](/docs/configuration-reference/supported-transports)
for the reasoning and what to do if your server is SSE-only.

## Call history does not persist

Call history lives in memory and is **cleared when the app closes**. It is
never written to disk. This keeps request and response payloads — which can
contain sensitive data — off your filesystem, but it means you can't review
yesterday's calls after a restart.

If you want a call to survive restarts, save its arguments as a
[Saved Request](/docs/testing/saved-requests) — those are persisted to disk
(without response data).

See [Call History](/docs/history-and-workflow/call-history).

## macOS: Apple Silicon only

Official macOS builds are **arm64 (Apple Silicon) only** — there is no
Intel (x64) build on the releases page. Intel Mac users can
[build from source](/docs/getting-started/installation), but x64 results
aren't officially tested or guaranteed.

See [Platform Notes](/docs/configuration-reference/platform-notes).

## Windows: unsigned builds

Windows installers are currently **unsigned**, so SmartScreen may show a
"Windows protected your PC" warning on first run. Click
**More info → Run anyway** to proceed. Signing for Windows builds is
planned but not yet in place.

See [Installation → Windows](/docs/getting-started/installation).

## Linux: no pre-built releases

There are no official pre-built Linux packages. Linux is buildable from
source with `npm run build:linux`.

See [Platform Notes](/docs/configuration-reference/platform-notes).

## Auto-update cannot be disabled in-app

From v0.3.0, MCPFlo checks GitHub Releases for a new version on every
launch and downloads updates in the background (it never restarts on its
own). There is currently **no in-app setting to turn this check off**. If
you need to prevent it, block the app's network access to `github.com` at
the OS or firewall level, or build from source — the updater is inactive in
source builds.

See [Installation → Updating](/docs/getting-started/installation) and the
[Privacy Policy](/privacy) for exactly what the update check involves.

## Related

- [Supported vs. Unsupported Transports](/docs/configuration-reference/supported-transports)
- [Platform Notes](/docs/configuration-reference/platform-notes)
- [Call History](/docs/history-and-workflow/call-history)
- [Common Connection & OAuth Errors](/docs/faq/common-errors)

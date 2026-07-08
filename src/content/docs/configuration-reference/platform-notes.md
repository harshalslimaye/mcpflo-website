---
title: Platform Notes
section: Configuration Reference
order: 4
description: >-
  Platform-specific constraints and deliberate limitations — arm64-only
  macOS builds, unsigned Windows builds, source-only Linux.
---

A reference for platform-specific constraints and deliberate limitations to
be aware of when installing or building MCPFlo.

## macOS: Apple Silicon (arm64) only

Official macOS releases are built for **arm64 (Apple Silicon)** only —
there is currently no official Intel (x64) build distributed via the
releases page. If you're on an Intel Mac, you'll need to build from source
(see
[Installation → Building from source](/docs/getting-started/installation));
results on x64 aren't officially tested or guaranteed.

## Windows: unsigned builds

Windows installers are currently **unsigned**, which may trigger a
SmartScreen warning ("Windows protected your PC") on first run. See
[Installation → Windows](/docs/getting-started/installation) for how to
proceed past it. Both x64 and arm64 Windows builds are produced
(`npm run build:win`).

## Linux: source builds only

There are no official pre-built Linux releases at this time. Linux users
should build from source using `npm run build:linux` (see
[Installation → Building from source](/docs/getting-started/installation)).

## Feature limitations (all platforms)

These apply regardless of OS and are deliberate, not bugs:

- **No SSE transport** — see
  [Supported vs. Unsupported Transports](/docs/configuration-reference/supported-transports).
- **History does not persist** — call history is cleared when the app
  closes; see [Call History](/docs/history-and-workflow/call-history).

## Summary table

| Platform | Distribution             | Architecture              | Signing            |
| -------- | ------------------------- | -------------------------- | ------------------- |
| macOS    | Pre-built `.dmg`          | arm64 only                 | Signed + notarized   |
| Windows  | Pre-built `.exe` (NSIS)   | x64 + arm64                | Unsigned             |
| Linux    | Build from source          | Depends on build machine   | N/A                  |

## Related

- See [Installation](/docs/getting-started/installation) for step-by-step
  setup per platform.
- See
  [CONTRIBUTING.md](https://github.com/harshalslimaye/mcpflo/blob/main/CONTRIBUTING.md)
  in the repository for the underlying build commands.

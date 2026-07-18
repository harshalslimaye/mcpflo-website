---
title: Installation
section: Getting Started
order: 2
description: >-
  Installing MCPFlo on macOS or Windows, and building from source.
---

## Requirements

- macOS (Apple Silicon / arm64 only) or Windows
- ~200 MB disk space

## macOS (.dmg)

1. Download the latest `.dmg` from the [GitHub releases page](https://github.com/harshalslimaye/mcpflo/releases).
2. Open the `.dmg` and drag **MCPFlo** into your Applications folder.
3. Launch it from Applications (or Spotlight).

macOS builds are signed with an Apple Developer ID and notarized, so the app
opens without any Gatekeeper warnings.

> **Upgrading from v0.0.6 or earlier?** Those builds were unsigned. Delete
> the old copy and install fresh from the latest release — the right-click →
> Open workaround is no longer needed.

## Windows

Download the latest installer (`.exe`, NSIS) from the
[releases page](https://github.com/harshalslimaye/mcpflo/releases).

> **Note:** Windows builds are currently **unsigned**. Windows SmartScreen
> may show a "Windows protected your PC" warning when you run the installer.
> Click **More info → Run anyway** to proceed. This is expected and not a
> sign of a corrupted download — signing for Windows builds is planned but
> not yet in place.

## Updating

From **v0.3.0** onwards, MCPFlo keeps itself up to date. On launch it checks
[GitHub Releases](https://github.com/harshalslimaye/mcpflo/releases) for a
newer version and downloads it in the background. When the download is
ready, a **Restart to update** prompt appears — the app never restarts on
its own. If you ignore the prompt, the update is applied the next time you
start the app.

If you're on **v0.2.0 or earlier**, update manually one last time: download
the latest installer from the releases page and install it over your
existing copy. Auto-update takes over from there.

## Building from source

Requires **Node.js 18+** and **npm 9+**.

```bash
git clone https://github.com/harshalslimaye/mcpflo.git
cd mcpflo
npm install
npm run dev
```

To produce a packaged build for a specific platform:

```bash
npm run build:mac     # macOS (dmg, arm64)
npm run build:win     # Windows (nsis, x64 + arm64)
npm run build:linux   # Linux
```

> Linux is buildable from source but doesn't currently have official
> pre-built releases — use `npm run build:linux` to produce your own package.

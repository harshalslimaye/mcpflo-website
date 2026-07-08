---
title: Capabilities Cache
section: Configuration Reference
order: 2
description: >-
  The on-disk cache of each server's discovered tools, resources, and
  prompts at <user-data>/servers/<id>/capabilities.json.
---

Alongside `config.json` (see
[Config File Location & Format](/docs/configuration-reference/config-file)),
MCPFlo maintains a separate on-disk cache of each server's **discovered
capabilities** — its tools, resources, and prompts — so they're available
instantly the next time you open the app.

## Location

```
<user-data>/servers/<server-id>/capabilities.json
```

Where `<user-data>` is the same per-OS application data directory used for
`config.json`:

| Platform | User-data root                           |
| -------- | ----------------------------------------- |
| macOS    | `~/Library/Application Support/MCPFlo/`  |
| Windows  | `%APPDATA%/MCPFlo/`                      |
| Linux    | `~/.config/MCPFlo/`                      |

Each connected server gets its own subdirectory, keyed by an internal
server ID, containing its own `capabilities.json`.

## What's cached

The result of the server's capability discovery — i.e. the list of tools
(with their schemas), resources, and prompts it exposed the last time
MCPFlo successfully connected to it.

## Why it exists

Without a cache, every app launch would require re-running full discovery
against every connected server before you could see anything in the
sidebar — slow for stdio servers that need to spawn a process, and
unnecessary if nothing has changed. Instead:

1. On launch, MCPFlo immediately shows the **cached** capability tree for
   each server.
2. In the background, it reconnects and re-runs discovery.
3. If the server's capabilities changed since last time, the tree updates
   to reflect the fresh result.

## When the cache goes stale

If you're actively developing a server and its capabilities change between
sessions, the cache is refreshed automatically on connect — you don't need
to intervene. If you ever suspect a stale cache is causing incorrect
behavior (e.g. a removed tool still appears momentarily), you can:

- Disconnect and reconnect the server to force a fresh discovery, or
- Delete the server's `capabilities.json` file directly while MCPFlo is
  closed.

## Removal

Removing a server from MCPFlo deletes its cached capabilities directory
along with its configuration entry — nothing is left behind.

## Related

- See
  [Config File Location & Format](/docs/configuration-reference/config-file)
  for the separate file storing server configuration itself.
- See
  [Cancelling & Refreshing Discovery](/docs/browsing-capabilities/cancelling-refreshing-discovery)
  for how the live re-fetch that refreshes this cache can be interrupted.

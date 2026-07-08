---
title: Managing Multiple Servers
section: Connecting to Servers
order: 5
description: >-
  Browse and test several MCP servers side by side, each over its own
  independent connection.
---

MCPFlo is built to work with several MCP servers at once, so you can browse
and test them side by side without disconnecting one to check another.

## Connecting multiple servers

- Add as many servers as you need via **+ Add Server** — there's no fixed
  limit.
- Each server runs over its **own pooled connection**, independent of the
  others.
- The sidebar lists every connected server with its own capability tree, so
  tools, resources, and prompts stay grouped by the server they came from.

## Per-server actions

Each server row exposes its own controls:

- **Connect / expand** — triggers capability discovery for that server.
- **Disconnect** — closes the connection without removing the server's saved
  configuration.
- **Remove** — deletes the server's configuration, its cached capabilities,
  and any spawned process.

## Process cleanup

For **stdio** servers, MCPFlo spawns and owns the underlying process. That
process is cleaned up automatically when:

- You remove the server, or
- The app quits.

You don't need to manually kill stray processes — MCPFlo tracks and
terminates them itself.

## Searching across servers

Use the unified filter (**⌘K**) to search tools, resources, and prompts
across _every_ connected server at once, rather than scanning each server's
tree individually. See
[The Capability Tree](/docs/browsing-capabilities/capability-tree) for
details.

## Cross-server activity

The **All** tab in call history (see
[Call History](/docs/history-and-workflow/call-history)) aggregates recent
calls across every connected server into a single, cross-server activity log
for the current session.

## Tips

- Disconnect servers you're not actively testing to reduce background
  resource usage, especially for stdio servers that spawn heavier processes.
- Server order in the sidebar reflects the order they were added; there's
  currently no manual reordering or grouping/folders.

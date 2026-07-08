---
title: The Capability Tree
section: Browsing Capabilities
order: 1
description: >-
  How discovered tools, resources, and prompts are grouped and browsed in
  the sidebar.
---

Once a server connects, MCPFlo automatically performs **capability
discovery** — asking the server what it exposes — and builds a tree of
everything available, grouped by server.

## Structure

Each connected server appears as a top-level row in the sidebar. Expanding
it reveals its capabilities grouped by type:

- **Tools** — actions the server can perform
- **Resources** — data the server can hand over
- **Prompts** — reusable message templates

Within each group, capabilities are listed by name. Selecting one opens its
detail/invocation view.

## Expand/collapse controls

- Expand or collapse an individual server, or a single capability group
  within it.
- Use the **expand-all** / **collapse-all** controls to open or close
  everything at once — useful when you're connected to several servers and
  want a full overview, or want to collapse everything back down to just
  server names.

## Multiple servers

When more than one server is connected, the tree stacks them one after
another, each with its own tools/resources/prompts groups — capabilities
are never mixed between servers, so it's always clear which server a given
tool belongs to.

## Empty groups

If a server doesn't expose a given capability type (e.g. a tools-only
server with no resources or prompts), that group is omitted rather than
shown empty.

## Refreshing

Capabilities are cached to disk per server (see
[Quickstart → Where config lives](/docs/getting-started/quickstart)) and
re-fetched on connect. If a server's capabilities change while you're
testing it (e.g. you add a new tool during development), disconnect and
reconnect the server to trigger a fresh discovery.

## Next

To find a specific capability quickly instead of scanning the tree manually,
use the unified filter — see
[Searching & Filtering (⌘K)](/docs/browsing-capabilities/searching-filtering).

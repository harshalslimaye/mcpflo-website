---
title: Searching & Filtering
navLabel: Searching & Filtering (⌘K)
section: Browsing Capabilities
order: 2
description: >-
  A single unified filter that searches tools, resources, and prompts across
  every connected server at once.
---

When you're connected to several servers with many tools, resources, and
prompts, scanning the full capability tree by hand gets slow. MCPFlo
provides a single unified filter for this.

## What it searches

The filter matches across **every connected server at once**, spanning all
three capability types:

- Tool names (and typically descriptions)
- Resource names/URIs
- Prompt names

Results update live as you type, narrowing the capability tree to just the
matches — non-matching servers and groups collapse out of view rather than
being deleted or hidden behind a separate results page.

## Why it's unified

Rather than searching one server or one capability type at a time, ⌘K
treats your entire connected workspace as a single searchable index. This
matters most when:

- You're not sure which server exposes the capability you're looking for.
- You know the tool name but not which server it belongs to.
- You want to quickly confirm no server exposes a given capability (e.g.
  checking for naming collisions before adding a new tool).

## Clearing the filter

Clear the search box (or close the search UI) to return to the full,
unfiltered capability tree.

## Related

- See [The Capability Tree](/docs/browsing-capabilities/capability-tree)
  for how results are grouped once filtered.
- See
  [Managing Multiple Servers](/docs/connecting-to-servers/managing-multiple-servers)
  for how servers are organized in the sidebar that this filter searches
  across.

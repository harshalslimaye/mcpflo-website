---
title: 'Quickstart: Add Your First Server'
navLabel: Quickstart
section: Getting Started
order: 3
description: >-
  Add your first MCP server and make your first call.
---

A fresh install of MCPFlo is seeded with
[`@mcpflo/server-everything`](https://github.com/harshalslimaye/mcpflo/tree/main/packages/server-everything) —
MCPFlo's own deterministic test-fixture server, which exercises every
capability the app supports (tools, resources, prompts, elicitation,
sampling, notifications). It's a good place to start exploring before you
connect a real server.

## Adding your own server

1. Click **+ Add Server** in the sidebar.
2. Enter a name and choose a transport:
   - **stdio** — provide the command and args (e.g. `npx` with args
     `-y @modelcontextprotocol/server-memory`), plus any environment
     variables.
   - **Streamable HTTP** — provide the URL, plus any request headers
     (e.g. `Authorization: Bearer …`).
   - Environment variables and headers use a key/value row editor and live
     in collapsible sections, so the form stays short until you need them.
   - An **Advanced** section exposes an optional connection timeout and MCP
     protocol version override.
   - Prefer pasting a config? Switch to **JSON import** and paste an
     `mcpServers` block (single or multiple entries) instead of filling out
     the form by hand.
3. Click **Add Server**.
4. Expand the server row — MCPFlo connects and discovers all tools,
   resources, and prompts automatically. If the server requires OAuth, your
   browser opens for sign-in and MCPFlo reconnects on its own.

## Example: JSON import

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

## Where config lives

Server configs are persisted with
[electron-store](https://github.com/sindresorhus/electron-store) to
`config.json` under the app's user-data directory (secrets are encrypted via
the OS keychain):

- **macOS:** `~/Library/Application Support/MCPFlo/config.json`
- **Windows:** `%APPDATA%/MCPFlo/config.json`
- **Linux:** `~/.config/MCPFlo/config.json`

Discovered capabilities are cached to disk per server under
`<user-data>/servers/<server-id>/capabilities.json`, so they're available
immediately on the next launch before a fresh discovery runs.

## Next steps

Once a server is expanded, head to
[Browsing Capabilities](/docs/browsing-capabilities/capability-tree) to
explore its tools, resources, and prompts, or jump straight to
[Invoking Tools & Prompts](/docs/invoking-tools-and-prompts/invocation-forms)
to make your first call.

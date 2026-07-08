---
title: Importing Servers via JSON
section: Connecting to Servers
order: 2
description: >-
  Paste an mcpServers block to add one or more servers at once, instead of
  filling out the form by hand.
---

If you already have server configs written down — from a README, another MCP
client, or your own notes — you can paste them directly instead of filling
out the Add Server form by hand.

## How to import

1. Click **+ Add Server** in the sidebar.
2. Switch to the **JSON import** tab.
3. Paste an `mcpServers` block containing one or more server entries.
4. Click **Add Server** — MCPFlo parses the block and adds every entry it
   contains.

## Format

The block follows the same `mcpServers` shape used by most MCP clients
(Claude Desktop, etc.), keyed by server name.

### stdio entry

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "API_KEY": "your-key-here"
      }
    }
  }
}
```

### Streamable HTTP entry

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://example.com/mcp",
      "headers": {
        "Authorization": "Bearer <token>"
      }
    }
  }
}
```

## Multiple servers at once

A single paste can contain any number of entries — useful for restoring a
whole setup in one go:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "remote-api": {
      "url": "https://example.com/mcp",
      "headers": {
        "Authorization": "Bearer <token>"
      }
    }
  }
}
```

## Notes

- Fields map 1:1 to the manual form — `command`/`args`/`env` for stdio,
  `url`/`headers` for Streamable HTTP.
- Secrets pasted in (tokens, API keys) are encrypted at rest via the OS
  keychain the same way as values entered through the form — they aren't
  stored as plain text.
- Advanced options (connection timeout, protocol version override) aren't
  part of the standard `mcpServers` shape and should be set afterward via
  the server's **Advanced** section if needed.
- If a server needs OAuth 2.1 rather than a static header, omit `headers` —
  MCPFlo will prompt for sign-in the first time you expand it. See
  [Authentication & OAuth 2.1](/docs/connecting-to-servers/authentication-oauth).

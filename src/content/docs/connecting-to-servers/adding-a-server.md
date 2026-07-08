---
title: Adding a Server
section: Connecting to Servers
order: 1
description: >-
  Connecting to an MCP server over stdio or Streamable HTTP.
---

MCPFlo supports two transports for connecting to an MCP server. Which one
you pick depends on where the server runs.

## stdio

Use **stdio** when the server is a local process that MCPFlo should spawn
and manage — most command-line MCP servers work this way (e.g. anything
you'd normally run with `npx`, `python`, `node`, etc.).

To add one:

1. Click **+ Add Server**, choose the **stdio** transport.
2. Enter the **command** (e.g. `npx`) and its **args** (e.g. `-y`,
   `@modelcontextprotocol/server-memory`).
3. Add any **environment variables** the server needs, using the key/value
   row editor.
4. Click **Add Server** — MCPFlo spawns the process and connects over its
   stdin/stdout.

MCPFlo manages the process lifecycle: it's started when you expand the
server, and cleaned up automatically when you remove the server or quit the
app.

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

## Streamable HTTP

Use **Streamable HTTP** when the server is already running remotely (or
locally as its own long-lived process) and exposes an HTTP endpoint.

To add one:

1. Click **+ Add Server**, choose the **Streamable HTTP** transport.
2. Enter the server's **URL**.
3. Add any **request headers** it needs — most commonly an
   `Authorization: Bearer <token>` header for token-authed servers.
4. Click **Add Server** — MCPFlo connects directly to the URL.

If the server requires **OAuth 2.1** instead of a static token, see
[Authentication & OAuth 2.1](/docs/connecting-to-servers/authentication-oauth) —
MCPFlo handles the sign-in flow automatically and doesn't need a header in
that case.

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

## Which one should I use?

|                  | stdio                            | Streamable HTTP            |
| ---------------- | -------------------------------- | -------------------------- |
| Server location  | Local process, spawned by MCPFlo | Remote or already-running  |
| Auth             | Environment variables            | Headers, or OAuth 2.1      |
| Typical use case | CLI-style servers, local dev     | Hosted/production servers  |

## Not supported

MCPFlo intentionally does not support the deprecated **HTTP+SSE**
transport — only stdio and Streamable HTTP are implemented.

## Advanced options

Both transports expose an **Advanced** section when adding a server:

- **Connection timeout** — override the default timeout for slow-starting
  servers.
- **Protocol version override** — pin the connection to a specific MCP
  protocol version, useful for testing how a server negotiates against an
  older or newer version.

## JSON import

Instead of filling out the form, switch to **JSON import** and paste an
`mcpServers` block — single or multiple entries — matching the examples
above. See
[Importing Servers via JSON](/docs/connecting-to-servers/importing-servers-json)
for details.

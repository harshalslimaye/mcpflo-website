---
title: Supported vs. Unsupported Transports
section: Configuration Reference
order: 3
description: >-
  MCPFlo supports stdio and Streamable HTTP. The deprecated HTTP+SSE
  transport is intentionally not implemented.
---

MCPFlo implements a deliberately focused set of MCP transports rather than
supporting every transport the protocol has ever defined. This page is the
reference for what's supported today.

## Supported

**stdio**
For local MCP servers spawned as a child process. MCPFlo manages the
process lifecycle (spawn, cleanup on remove/quit). See
[Adding a Server](/docs/connecting-to-servers/adding-a-server).

**Streamable HTTP**
For remote (or already-running) MCP servers exposed over HTTP. Supports
custom request headers and OAuth 2.1 authentication. See
[Adding a Server](/docs/connecting-to-servers/adding-a-server) and
[Authentication & OAuth 2.1](/docs/connecting-to-servers/authentication-oauth).

## Not supported

**HTTP+SSE (deprecated transport)**
The older HTTP+SSE transport — superseded by Streamable HTTP in the MCP
spec — is **intentionally not implemented**. If you're connecting to a
server that only speaks SSE and not Streamable HTTP, it currently cannot be
added to MCPFlo.

This is a deliberate scope decision, not an oversight: Streamable HTTP is
the protocol's current recommended transport for remote servers, and
supporting the deprecated variant alongside it would add complexity for a
transport most servers have already moved away from.

## What to do if your server only supports SSE

- Check whether the server (or a newer version of it) supports Streamable
  HTTP instead — many actively maintained MCP servers have migrated.
- If you maintain the server yourself, consider adding Streamable HTTP
  support alongside (or instead of) SSE.

## Related

- See [Adding a Server](/docs/connecting-to-servers/adding-a-server) for
  how to configure each supported transport.
- See the "Not supported" list in
  [Platform Notes](/docs/configuration-reference/platform-notes) for other
  deliberate scope limitations (no persistent history, macOS arm64-only).

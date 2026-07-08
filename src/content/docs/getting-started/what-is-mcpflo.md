---
title: What is MCPFlo?
section: Getting Started
order: 1
description: >-
  MCPFlo is a desktop application for visually testing Model Context Protocol
  (MCP) servers — think Bruno or Postman, but for MCP.
---

MCPFlo is a desktop application for visually testing Model Context Protocol
(MCP) servers. Think of it as Bruno or Postman, but for MCP — instead of
poking at REST/GraphQL APIs, you connect to an MCP server, browse everything
it exposes, and invoke it directly, all through a GUI.

MCP servers expose their capabilities as tools, resources, and prompts, and
typically these are consumed by an AI model inside a client like Claude or an
agent framework. That's great for production use, but it makes servers hard
to test in isolation — to see what a tool actually returns, or to inspect a
raw response, you'd otherwise need to wire up a full AI client or write a
throwaway script. MCPFlo removes the model from that loop entirely: you talk
to the server directly, with real inputs and real responses, and see exactly
what's happening at the protocol level.

With MCPFlo you can:

- **Connect** to one or more MCP servers over stdio or Streamable HTTP,
  including servers that require OAuth 2.1 authentication.
- **Browse** the full capability tree — every tool, resource, and prompt the
  server exposes — with search and a token/context-budget estimate.
- **Invoke** any tool or prompt through an auto-generated, schema-driven
  form, and inspect the response (JSON, images, audio, embedded resources)
  exactly as the server sent it.
- **Revisit** past calls with a lightweight, replayable history.

## Who it's for

- **MCP server authors** who want fast feedback while building — invoke a
  tool the moment you add it, without restarting an AI client or writing a
  test harness.
- **Integrators and QA engineers** validating that a third-party or in-house
  MCP server behaves as documented before wiring it into a production agent.
- **Anyone debugging an agent** that talks to an MCP server, who needs to
  reproduce a specific tool call outside the agent to see if the problem is
  in the server or the agent's usage of it.

It is not an AI chat client and doesn't involve a model — it's a
protocol-level inspector and testing tool, for humans who need to see and
drive MCP servers directly.

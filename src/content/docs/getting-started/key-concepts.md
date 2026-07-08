---
title: Key Concepts — MCP Primer
navLabel: Key Concepts
section: Getting Started
order: 4
description: >-
  The MCP primitives you'll see throughout the app — tools, resources,
  prompts, elicitation, and sampling.
---

MCPFlo is a client for the **Model Context Protocol (MCP)** — an open
protocol that lets an application expose capabilities to an AI model (or, in
MCPFlo's case, to you directly) in a structured, discoverable way. If you're
new to MCP, these are the primitives you'll see throughout the app.

## Tools

A **tool** is an action the server can perform — the MCP equivalent of a
function call. Each tool declares a JSON Schema for its input, so a client
knows what arguments to send before calling it. In MCPFlo, tools render as
an auto-generated form based on that schema; you fill it in, invoke the
tool, and see the raw result.

_Example: a `search_files` tool might take a `query` string and a `path`,
and return a list of matches._

## Resources

A **resource** is a piece of data the server can hand over — a file, a
database record, a URL's contents — identified by a URI. Unlike a tool,
reading a resource has no side effects; it's just fetching data. Resources
can be text or binary (MCPFlo renders both), and a server can also _link_ to
a resource from within a tool's response.

_Example: a resource might expose `file:///project/README.md` or
`postgres://db/table/rows`._

## Prompts

A **prompt** is a reusable, parameterized template for a conversation — a
predefined set of message turns the server suggests, which can take named
arguments. Rendering a prompt in MCPFlo expands it into the actual message
turns it produces, so you can see exactly what the server would hand to a
model.

_Example: a `code_review` prompt might take a `diff` argument and expand
into a system + user message pair ready to send to an LLM._

## Elicitation

**Elicitation** (`elicitation/create`) lets a server ask the _user_ for more
information mid-call — for example, a tool that needs a missing parameter or
a confirmation before proceeding. When a server elicits input, MCPFlo
renders the requested schema as a form right there in the call flow, and
sends your answer back to resume the tool. (Only form-mode elicitation is
supported; URL-mode is not.)

## Sampling

**Sampling** (`sampling/createMessage`) is the reverse relationship: it lets
a server ask the _client_ to run an LLM completion on its behalf — useful
for servers that need a model's help to finish a task. Since MCPFlo has no
model in the loop, it surfaces the sampling request to _you_ and lets you
type the response by hand. This keeps every interaction deterministic and
token-free, and lets you see exactly what a server is asking a model to do.

## How they fit together

A single MCP server can expose any mix of tools, resources, and prompts.
When you connect to a server in MCPFlo, it performs **capability
discovery** — asking the server what it offers — and builds the capability
tree you browse in the sidebar. From there, invoking a tool, reading a
resource, or rendering a prompt all follow the same request/response pattern
over the connection's transport (stdio or Streamable HTTP).

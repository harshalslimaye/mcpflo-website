---
title: The Scripting API
section: Testing
order: 2
description: >-
  The full reference for test(), expect()/assert(), and the res object
  available inside every test script.
---

Every test script runs with three globals available: `test()`,
`expect()`/`assert()`, and `res`. This page is the full reference for all
three.

## `test(name, fn)`

Registers one named check.

```js
test('a descriptive name', () => {
  // assertions go here
})
```

- `fn` can be synchronous or return a Promise — an async check is
  supported:
  ```js
  test('async check', async () => {
    expect(res.getBody().status).to.equal('ok')
  })
  ```
- If `fn` throws (or its returned promise rejects), the test is recorded
  as **failed**, with the thrown error's message. If Chai's assertion
  carries `.actual`/`.expected` (e.g. `to.equal`, `to.eql`), both are
  captured for the result view's side-by-side display.
- If `fn` returns without throwing (or its promise resolves), the test is
  recorded as **passed**.
- A script can call `test()` any number of times; each call is an
  independent row in the results.

## `expect()` / `assert()`

Both are [Chai](https://www.chaijs.com/api/bdd/)'s assertion APIs,
available as-is:

```js
expect(res.getText()).to.include('success')
expect(res.raw.content).to.have.lengthOf(2)
assert.isTrue(res.isError === false)
```

Anything Chai's `expect`/`assert` support is available — `.to.equal`,
`.to.eql`, `.to.include`, `.to.be.a(...)`, `.to.throw`, chained matchers,
and so on.

## `console.log` / `.info` / `.warn` / `.error`

All four are captured (not printed anywhere real) and shown in a
collapsible **Console** section in the result view — useful for
inspecting intermediate values while writing a script.

```js
console.log('body was', res.getBody())
```

## `res` — the call result

`res`'s shape depends on which kind of capability the script is attached
to (`tool`, `prompt`, or `resource`) — set automatically based on where
the Tests tab lives.

### Shared across all three kinds

| Member | Description |
|---|---|
| `res.getText()` | All text content joined with `\n` (empty string if none) |
| `res.body` / `res.getBody()` | The parsed "payload" — see per-kind notes below |
| `res.responseTime` / `res.getResponseTime()` | Call duration in ms, or `null` if not measured |
| `res.getSize()` | `{ body, total }` — real UTF-8 byte counts |
| `res.raw` / `res.getRaw()` | The whole underlying result object, untouched |

### Tool results

| Member | Description |
|---|---|
| `res.isError` / `res.getIsError()` | `true` if the tool call reported an error |
| `res.content` / `res.getContent()` | The raw `content` array (or `[]`) |
| `res.getText()` | All `text`-type content blocks joined with `\n` |
| `res.body` / `res.getBody()` | `structuredContent` if present; otherwise `getText()`'s output, JSON-parsed if it parses, else the raw string, else `null` |

### Prompt results

| Member | Description |
|---|---|
| `res.messages` / `res.getMessages()` | The raw `messages` array (or `[]`) |
| `res.getText()` | Each message's single text content block, joined with `\n` |
| `res.body` / `res.getBody()` | `getText()`'s output, JSON-parsed if it parses, else raw string, else `null` |

### Resource results

| Member | Description |
|---|---|
| `res.contents` / `res.getContents()` | The raw `contents` array (or `[]`) |
| `res.getText()` | Every text entry's `.text` joined with `\n` (blob-only entries skipped) |
| `res.body` / `res.getBody()` | Same JSON-parse-or-raw-or-`null` behavior as tool/prompt, applied to `getText()` |

## Example: testing each kind

```js
// Tool
test('sum is correct', () => {
  expect(res.getBody()).to.eql({ result: 4 })
})

// Prompt
test('renders a system + user turn', () => {
  expect(res.messages).to.have.lengthOf(2)
})

// Resource
test('returns non-empty text', () => {
  expect(res.getText().length).to.be.above(0)
})
```

## Related

- Scripts run in an isolated sandbox with limits on memory and execution
  time, and no network or filesystem access — `res` is the only data a
  script can see.
- See [Running Tests per Capability](/docs/testing/running-tests-per-capability)
  for how `res` gets its data — it's always built from your **most recent
  call** to that capability.

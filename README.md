# bincode-typescript

Generates TypeScript serialisation and deserialisation code from Rust structs
and enums

## Goals

- Generate TypeScript code directly from Rust source
- TypeScript must compile with [`strict` mode enabled](https://github.com/timfish/bincode-typescript/blob/master/tests/build.rs)
- Avoid Object Orientated TypeScript for better tree-shaking and optimisation
- TypeScript should be ergonomic and high performance
  - Use `const enum` for Unit enums and respect discriminant values!
  - Use `TypedArray` and copy byte blocks for `Vec<{integer,float}>` for greater performance

## Status

I'm pretty new to Rust and I've just hacked around until the tests pass 🤷‍♂️

There is much room for improvement and PRs are welcome!

Check the source for [currently supported Rust types and their TypeScript
equivalents](https://github.com/timfish/bincode-typescript/blob/master/src/types.rs#L30).

You may also like to look at the [Rust
types](https://github.com/timfish/bincode-typescript/blob/master/tests/test_types.rs)
used in the tests and the [TypeScript
generated](https://github.com/timfish/bincode-typescript/blob/master/tests/test_types.ts)
from these.

## Current Issues & Limitations

- All values must be owned
- Generic structs/enums will almost certainly cause a panic
- All types must be in a single file
- Serde attributes are not currently respected
- `Vec<T>` are always converted to `Uint8Array/Int8Array/etc` whenever possible
  and this might not always be desired.
- Generated code will not work on node < v11 due to the global usage of `TextEncoder/TextDecoder`

## Example via `build.rs`

There is currently a single `bool` option to enable support for node.js
`Buffer`, so if you are running in the browser you probably don't want this enabled.

```rust
bincode_typescript::from_file("./src/types.rs", "./ts/types.ts", false);
```

## Example via CLI

There is currently a single option (`--buffer-support`) to enable support for node.js
`Buffer`.

```shell
./bincode-typescript --support-buffer ./src/types.rs > ./ts/types.ts
```

## Tests

Before running the tests, ensure that you have all the node.js dependencies
installed by running `yarn` or `npm i`.

The tests check serialisation and deserialisation from generated TypeScript by
round-tripping encoded data via stdio and asserting the expected values.

## Prior Art

This builds on (ie. much TypeScript stolen from) the following projects.

_The stated pros and cons are just personal opinion!_

### [`ts-rust-bridge`](https://github.com/twop/ts-rust-bridge)

### Pros:

- Function based TypeScript API
- Great ergonomics for enums with combination of `type` + `interface` + `module`

### Cons:

- Generates both Rust and TypeScript from a DSL. (**I want Rust to be the source
  of truth**).
- Does not use `const enum` for Unit enums

### [`serde-reflection/serde-generate`](https://github.com/novifinancial/serde-reflection/pull/59)

### Pros:

- Uses `serde` so no messing around parsing Rust

### Cons:

- All types have to be run through the registry after build so wont work from `build.rs`
- TypeScript classes wrap every type and use inheritance (ie. no `const enum`)
- Runtime TypeScript is separate

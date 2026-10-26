---
title: "Use const by default in JavaScript"
description: "A simple rule for writing more predictable JavaScript."
pubDate: 2026-10-21
lang: en
translationKey: "const-by-default"
draft: false
tags:
  - JavaScript
  - Tips
---

## Use const by default

When declaring a variable in JavaScript, prefer `const`
unless you know that the variable will need to be reassigned.

For example:

```js
const username = "Amin";
const languages = ["JavaScript", "Python"];
```

Use `let` when reassignment is necessary:

```js
let count = 0;
count += 1;
```

This makes your code easier to reason about because
the intention behind each variable is clearer.

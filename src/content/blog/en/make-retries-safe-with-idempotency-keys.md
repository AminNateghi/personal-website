---

title: "Make retries safe with idempotency keys"
description: "Mobile networks are unreliable. A user might tap “Place order” lose connectivity, and retry even though the server already processed the first request."
pubDate: 2026-11-04
lang: en
translationKey: "make-retries-safe-with-idempotency-keys"
draft: false
tags:
- ReactNative
- Expo
- Tips

---

## Make retries safe with idempotency keys

Mobile networks are unreliable. A user might tap “Place order” lose connectivity, and retry even though the server already processed the first request.

Generate one idempotency key per logical operation and reuse it for retries.

```ts
import * as Crypto from "expo-crypto";
const idempotencyKey = Crypto.randomUUID();

async function submitOrder(order: Order) {
  return fetch("https://api.example.com/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(order),
  });
}
```

**Why it matters:** Correctness no longer depends on network response order.

**Production pitfalls:**

- Handle errors in UI state rather than only logging them.
- Prefer `AbortController` when supported by the underlying operation to cancel unnecessary network work.
- In React Strict Mode, effects can run an extra setup/cleanup cycle in development. Effects must be safe to repeat.

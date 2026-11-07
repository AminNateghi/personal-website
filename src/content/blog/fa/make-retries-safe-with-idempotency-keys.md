---

title: "ایمن کردن عملیات تکرار با UUID"
description: "شبکه‌های موبایل غیرقابل‌ اطمینانن. ممکنه کاربر دکمه «ثبت سفارش» بزنه، همون موق اینترنت موبایل قطع شه و دوباره دکمه بزنه؛ اما سرور قبلا رکوئست اولش رو پردازش کرده."
pubDate: 2026-11-04
lang: fa
translationKey: "make-retries-safe-with-idempotency-keys"
draft: false
tags:
- ReactNative
- Expo
- Tips

---

## Make retries safe with idempotency keys

شبکه‌های موبایل غیرقابل‌ اطمینانن. ممکنه کاربر دکمه «ثبت سفارش» بزنه، همون موقع اینترنت موبایل قطع شه و دوباره دکمه رو بزنه؛ اما سرور قبلا رکوئست اولش رو پردازش کرده، اینترنت نداشته که ببینه.

برای هر رکوئست، یک کلید از نوع UUID درست کن و تو تکرارهای بعدی، از همون کلید استفاده کن.

```ts
import * as Crypto from "expo-crypto";

async function submitOrder(order: Order) {
  const idempotencyKey = Crypto.randomUUID();

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

**دلیل:** پاسخ سرور دیگه اهمیتی به ترتیب درخواست‌ها نداره.


**چالش‌های محیط پروداکشن:**

- بهتره خطاها رو مستقیماً تو وضعیت رابط کاربری (UI state) مدیریت بشه، نه اینکه فقط لاگ بزنیم.

- اگه پیاده‌سازی‌های `AbortController` در سمت سرور انجام شده، بهتره برای کنسل کردن ترافیک‌های غیرضروری استفاده بشه.

- تو حالت Strict Mode ری‌اکت، افکت‌ها تو محیط دولوپ یک دور اضافه اجرا و بعد پاک می‌شن؛ پس افکت‌ها باید جوری نوشته بشن که تکرارشون بدون مشکل و ایمن باشه.

---
title: "در جاوااسکریپت، پیش‌فرض از const استفاده کنید"
description: "قاعده‌ای ساده برای نوشتن کد جاوااسکریپت قابل‌پیش‌بینی‌تر."
pubDate: 2026-10-21
lang: fa
translationKey: "const-by-default"
draft: false
tags:
  - JavaScript
  - Tips
---

# استفاده از const به‌صورت پیش‌فرض

هنگام تعریف متغیر در جاوااسکریپت، بهتر است از `const`
استفاده کنید؛ مگر اینکه لازم باشد مقدار متغیر را دوباره
تغییر دهید.

برای مثال:

```js
const username = "Amin";
const languages = ["JavaScript", "Python"];
```

اگر لازم است مقدار متغیر را تغییر دهید، از `let` استفاده کنید:

```js
let count = 0;
count += 1;
```

این کار باعث می‌شود هدف و رفتار متغیرها در کد واضح‌تر باشد.

---
title: "جلوگیری از آپدیت Async قدیمی"
description: "استفاده از AbortController برای لغو آپدیت"
pubDate: 2026-10-26
lang: fa
translationKey: "avoid-stale-async-updates"
draft: false
tags:
  - React
  - Tips
---

## جلوگیری از آپدیت Async قدیمی

وقتی وابستگی‌های یک کامپوننت تعییر میکنه یا اون کامپوننت از DOM حذف میشه بهتره از ‍`AbortConttroller` برای کنسل کردن رکوئست استفاده بشه

```ts
useEffect(() => {
  const controller = new AbortController();

  async function loadUser() {
    try {
      const response = await fetch(
        `/api/users/${userId}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Failed to load user");
      }

      setUser(await response.json());
    } catch (error) {
      if (
        error instanceof Error &&
        error.name !== "AbortError"
      ) {
        setError(error);
      }
    }
  }

  loadUser();
  return () => controller.abort();
}, [userId]);
```

**دلیل:** اگر کاربر با سرعت بین پروفایل‌ها جابجا بشه ممکنه رکوئست‌های قدیمی‌تر بعد از رکوئست جدیدتر آماده بشه. Cancellation جلوی کار غیرضروری و بازنویسی جواب رکوئست‌های قدیمی می‌گیره.

**نکته:** Cancellation برای کم کردن بار از سمت سرور نیست. برای برنامه‌های پیچیده، بهتره از [TanStack Query](https://tanstack.com/query/latest) استفاده بشه.

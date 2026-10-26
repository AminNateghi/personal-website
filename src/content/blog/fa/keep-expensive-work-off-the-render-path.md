---

title: "کارهای پرهزینه سمت رندر انجام ندید"
description: "محاسبات سنگین یا تحلیل روی دیتاها تو هر رندر انجام ندید"
pubDate: 2026-10-27
lang: fa
translationKey: "keep-expensive-work-off-the-render-path"
draft: false
tags:
- ReactNative
- Tips

---

## کارهای پرهزینه سمت رندر انجام ندید

محاسبات سنگین یا تحلیل روی دیتاها تو هر رندر انجام ندید.

```ts
useEffect(() => {
  const filteredProducts = useMemo(() => {
  const normalized = query.trim().toLowerCase();

  return products.filter(product =>
    product.name.toLowerCase().includes(normalized)
  );
}, [products, query]);
```

**دلیل:** تو موبایل، فیلتر کردن چندین‌باره لیست‌های بزرگ می‌تونه افت فریم و کندی برای کاربر داشته باشه.

**نکته:** `useMemo` برای بهینه‌سازی عملکرده، نه تضمین کننده صحت عملکرد. برای لیست‌های بسیار بزرگ، باید فیلترینگ سمت سرور باشد، استفاده از [FlatList](https://reactnative.dev/docs/flatlist) پیشنهاد میشه و حتما روی گوشی موبایل عملکرد لیست‌های بزرگ بررسی کنید.

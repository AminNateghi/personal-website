---

title: "استفاده از transaction دیتابیس برای عملیات چندمرحله‌ای"
description: "وقتی چندین عملیات بر روی دیتابیس دارید که احتمال موفق بودن یا نبودن اونها وجود داره، همه اونها تو یک تراکنش بزارید."
pubDate: 2026-10-31
lang: fa
translationKey: "use-database-transactions-for-multi-step-writes"
draft: false
tags:
- Nest
- TypeORM
- Tips

---

## استفاده از transaction دیتابیس برای عملیات چندمرحله‌ای

وقتی چندین عملیات بر روی دیتابیس دارید که احتمال موفق بودن یا نبودن اونها وجود داره، همه اونها تو یک تراکنش (transaction) بزارید.
برای مثال تو TypeORM:

```ts
await this.dataSource.transaction(async (manager) => {
  const order = manager.create(Order, orderData);
  await manager.save(order);

  const inventory = await manager.findOneByOrFail(Inventory, {
    productId: orderData.productId,
  });

  if (inventory.quantity < orderData.quantity) {
    throw new Error("Insufficient inventory");
  }

  inventory.quantity -= orderData.quantity;
  await manager.save(inventory);
});
```

**دلیل:** اگه آپدیت موجودی به خطا بخوره، عملیات ثبت سفارش به حالت قبلش برمی‌گرده (رول بک میشه)، برای همین جلوی ثبت عملیات ناقص تو دیتابیس گرفته میشه.

**نکته:** برای تمام عملیات‌های دیتابیس در مدت تراکنش، از `manager` با محدوده-تراکنش (transaction-scoped) استفاده بشه.
برای APIهای محیط پروداکشن، برای موردهای ثبت سفارش‌های همزمان که ممکنه ثبت پیش‌فروش یا کسری موجودی اتفاق بی‌افته
از ایزوله (isolation) یا لاک کردن (locking) استفاده بشه و از خطاهای اختصاصی دامنه (domain-specific exceptions) استفاده کنید.

---

title: "جلوگیری از آپدیت‌های همزمان با قفل کردن"
description: "فرض کن دو تا رکوئست همزمان درخواست خوندن از جدول موجودی می‌کنن که عدد ۱۰ هستش. حالا هردوتا رکوئست بخوان ۳ واحد کم بکنن و عدد ۷ رو بخوان ذخیره کنن، این وسط یکی از درخواست‌ها عملا از بین میره."
pubDate: 2026-11-04
lang: fa
translationKey: "prevent-lost-updates-with-optimistic-locking"
draft: false
tags:
- Nest
- TypeORM
- Tips

---

## جلوگیری از آپدیت‌های همزمان با قفل کردن خوشبینانه (Optimistic Locking)

فرض کن دو تا رکوئست همزمان درخواست خوندن از جدول موجودی می‌کنن که عدد ۱۰ هستش. حالا هردوتا رکوئست بخوان ۳ واحد کم بکنن و عدد ۷ رو بخوان ذخیره کنن، این وسط یکی از درخواست‌ها عملا از بین میره.

با اضافه کردن یه ستون version می‌شه آپدیت کردن‌ها از رکوئست‌های قدیمی رو کنسل کرد.

یه مثال ساده با استفاده از TypeORM:

```ts
const result = await this.repository
  .createQueryBuilder()
  .update(Inventory)
  .set({
    quantity: () => "quantity - :amount",
    version: () => "version + 1",
  })
  .where("id = :id", { id })
  .andWhere("version = :version", { version })
  .andWhere("quantity >= :amount", { amount })
  .setParameters({ amount, version })
  .execute();

if (result.affected !== 1) {
  throw new ConflictException(
    "Inventory changed or stock is insufficient",
  );
}
```

فرض کن جدول موجودی این ستون‌ها رو داره `id`، `quantity` و `version` سرویس موقع خوندن همون چیزی که بوده رو برمی‌گردونه.

**دلیل اهمیت:**  دیتابیس به‌روزرسانی موجودی ستون را فقط وقتی انجام میده که ورژن رکورد خونده شده با ورژن آپدیت یکی باشه.

**چالش‌های پروداکشن:**

- ستون version باید مقدار اولیه داشته باشه و با هربار آپدیت رکورد تغییر و عددش افزایش پیدا کنه.
- اگه تداخل داشتید اونو به عنوان دوباره خوندن دیتا درنظر بگیر و بهتره خطای HTTP با کد `409 Conflict` برگردونی.
- کد SQL تولیدشده و رفتار مربوط به تعداد ردیف‌های تحت‌تأثیر (affected rows) تو دیتابیس بررسی کنید.
- برای آپدیت‌های پیچیده چند رکوردی، به جای این راه‌حل از تراکنش‌ها یا از قفل‌کردن متناسب (Appropriate Locking) استفاده بشه.

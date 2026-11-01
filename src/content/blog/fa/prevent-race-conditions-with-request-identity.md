---

title: "جلوگیری از شرایط رقابتی با شناسه درخواست"
description: "وقتی تو فیلد جستجو هم‌زمان با تایپ متن درخواست‌ها ارسال بشه، ممکنه ریپسانس یه درخواست قدیمی‌تر بعد از یک درخواست جدیدتر بیاد و نتیجه که قدیمی بوده رو بجای نتیجه درست نشون بده."
pubDate: 2026-11-01
lang: fa
translationKey: "prevent-race-conditions-with-request-identity"
draft: false
tags:
- React
- Tips

---

## جلوگیری از شرایط رقابتی (Race Conditions) با شناسه درخواست (Request Identity)

وقتی تو فیلد جستجو هم‌زمان با تایپ متن درخواست‌ها ارسال بشه، ممکنه ریپسانس یه درخواست قدیمی‌تر بعد از یک درخواست جدیدتر بیاد و نتیجه که قدیمی بوده رو بجای نتیجه درست نشون بده.

برای این کار از یه id درخواست با حالت شمارشی (Increasing Request ID) بهتره استفاده بشه تا مطمئن بشیم فقط جدیدترین رکوئست، State رو آپدیت می‌کنه.

```ts
function useLatestSearch(query: string) {
  const requestId = useRef(0);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const id = ++requestId.current;

    async function search() {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();

      if (id === requestId.current) {
        setResults(data);
      }
    }

    search().catch(console.error);

    return () => {
      requestId.current++;
    };
  }, [query]);

  return results;
}
```

**دلیل:** نتیجه درخواست‌ها دیگه به ترتیب رسیدن پاسخ‌ها از سمت سرور وابستگی نداره.

**چالش‌های محیط پروداکشن:**

- بهتره خطاها رو مستقیماً تو وضعیت رابط کاربری (UI state) مدیریت بشه، نه اینکه فقط لاگ بزنیم.

- اگه پیاده‌سازی‌های `AbortController` در سمت سرور انجام شده، بهتره برای کنسل کردن ترافیک‌های غیرضروری استفاده بشه.

- تو حالت Strict Mode ری‌اکت، افکت‌ها تو محیط دولوپ یک دور اضافه اجرا و بعد پاک می‌شن؛ پس افکت‌ها باید جوری نوشته بشن که تکرارشون بدون مشکل و ایمن باشه.

---

title: "Keep expensive work off the render path"
description: "Stabilize expensive derived data and avoid recreating large computations on every render."
pubDate: 2026-10-27
lang: en
translationKey: "keep-expensive-work-off-the-render-path"
draft: false
tags:
- ReactNative
- Tips

---

## Keep expensive work off the render path

Stabilize expensive derived data and avoid recreating large computations on every render.

```ts
useEffect(() => {
  const filteredProducts = useMemo(() => {
  const normalized = query.trim().toLowerCase();

  return products.filter(product =>
    product.name.toLowerCase().includes(normalized)
  );
}, [products, query]);
```

**Why it matters:** On mobile devices, repeatedly filtering large lists can contribute to dropped frames and sluggish interactions.

**Advanced note:** `useMemo` is a performance optimization, not a correctness guarantee. For very large datasets, also consider server-side filtering, list virtualization with [FlatList](https://reactnative.dev/docs/flatlist), and profiling on a real device.

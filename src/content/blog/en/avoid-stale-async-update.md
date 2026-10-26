---
title: "Avoid stale async updates"
description: "Use AbortController to cancel outdated requests."
pubDate: 2026-10-26
lang: en
translationKey: "avoid-stale-async-updates"
draft: false
tags:
  - React
  - Tips
---

## Avoid stale async updates

Use `AbortController` to cancel outdated requests when a component's dependencies change or it unmounts.

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

**Why it matters:** If a user switches rapidly between profiles, an older request may finish after a newer one. Cancellation prevents unnecessary work and helps avoid outdated results overwriting newer state.

**Tip:** Cancellation is not a substitute for server-side consistency. For complex applications, consider a query library such as [TanStack Query](https://tanstack.com/query/latest)

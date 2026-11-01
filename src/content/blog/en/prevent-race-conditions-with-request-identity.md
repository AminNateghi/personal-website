---

title: "Prevent race conditions with request identity"
description: "When a search box triggers requests as the user types, an older response can arrive after a newer one and overwrite the correct results."
pubDate: 2026-11-01
lang: en
translationKey: "prevent-race-conditions-with-request-identity"
draft: false
tags:
- React
- Tips

---

## Prevent race conditions with request identity

When a search box triggers requests as the user types, an older response can arrive after a newer one and overwrite the correct results.
Use a monotonically increasing request ID to ensure only the latest request updates state.

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

**Why it matters:** Correctness no longer depends on network response order.

**Production pitfalls:**

- Handle errors in UI state rather than only logging them.
- Prefer `AbortController` when supported by the underlying operation to cancel unnecessary network work.
- In React Strict Mode, effects can run an extra setup/cleanup cycle in development. Effects must be safe to repeat.

---

title: "Prevent lost updates with optimistic locking"
description: "Imagine two requests read an inventory quantity of 10. Both subtract 3, and both save 7. One update has effectively been lost."
pubDate: 2026-11-04
lang: en
translationKey: "prevent-lost-updates-with-optimistic-locking"
draft: false
tags:
- Nest
- TypeORM
- Tips

---

## Prevent lost updates with optimistic locking

Imagine two requests read an inventory quantity of 10. Both subtract 3, and both save 7. One update has effectively been lost.

A version column lets you reject writes based on stale data.

Example using TypeORM's query builder:

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

Assume Inventory has `id`, `quantity`, and `version` columns, and the client or service supplies the version it originally read.

**Why it matters:** The database performs the decrement atomically and accepts the update only if the version still matches and sufficient stock remains.

**Production pitfalls:**

- Initialize the version column and increment it on every relevant write.
- Treat a conflict as a signal to reload, retry safely, or return an appropriate HTTP `409 Conflict`.
- Verify the generated SQL and affected-row behavior for your database.
- For complex multi-row invariants, consider transactions and appropriate locking instead.

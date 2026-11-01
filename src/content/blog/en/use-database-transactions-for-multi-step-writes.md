---

title: "Use database transactions for multi-step writes"
description: "When several database operations must succeed or fail together, wrap them in a transaction."
pubDate: 2026-10-31
lang: en
translationKey: "use-database-transactions-for-multi-step-writes"
draft: false
tags:
- Nest
- Tips

---

## Use database transactions for multi-step writes

When several database operations must succeed or fail together, wrap them in a transaction.
Example using TypeORM:

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

**Why it matters:** If the inventory update fails, the order insert is rolled back too, preventing a partially completed database operation.

**Tip:** Use the transaction-scoped `manager` for every database operation in the transaction. For production APIs, also enforce appropriate isolation or locking where concurrent orders could oversell stock, and use domain-specific exceptions.

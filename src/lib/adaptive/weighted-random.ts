export type WeightedItem<T> = {
  item: T;
  weight: number;
};

export function weightedRandomSample<T>({
  items,
  count,
  seed = Math.random
}: {
  items: WeightedItem<T>[];
  count: number;
  seed?: () => number;
}): T[] {
  const pool = items.filter((entry) => entry.weight > 0);
  const selected: T[] = [];

  while (selected.length < count && pool.length > 0) {
    const totalWeight = pool.reduce((sum, entry) => sum + entry.weight, 0);
    let cursor = seed() * totalWeight;

    const selectedIndex = pool.findIndex((entry) => {
      cursor -= entry.weight;
      return cursor <= 0;
    });

    const index = selectedIndex === -1 ? pool.length - 1 : selectedIndex;
    const [picked] = pool.splice(index, 1);
    selected.push(picked.item);
  }

  return selected;
}

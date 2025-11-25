import DataLoader from "dataloader";
import { groupBy, keyBy } from "es-toolkit";
import { ItemSortOrder } from "src/content/shared/constants";
import { ManyLoader, UniqueLoader } from "./data-loader.types";

const UNORDERED_ITEM_SORT_PRIORITY = 999;

export const createUniqueLoader = <T extends { id: number }>(
  batchFn: (ids: readonly number[]) => Promise<T[]>,
  entityName: string
): UniqueLoader<T> => {
  const loader = new DataLoader<number, T>(async (ids) => {
    const items = await batchFn(ids);
    const itemsMap = keyBy(items, (item) => item.id);
    return ids.map((id) => itemsMap[id]);
  });

  return {
    findUniqueOrThrowById: async (id: number) => {
      const result = await loader.load(id);
      if (!result) {
        throw new Error(`${entityName} with id ${id} not found`);
      }
      return result;
    },
  };
};

export const createManyLoader = <T extends { contentId: number; item: { name: string } }>(
  batchFn: (ids: readonly number[]) => Promise<T[]>
): ManyLoader<T> => {
  const loader = new DataLoader<number, T[]>(async (contentIds) => {
    const items = await batchFn(contentIds);

    const sortedItems = [...items].sort((a, b) => {
      const aOrder = ItemSortOrder[a.item.name] ?? UNORDERED_ITEM_SORT_PRIORITY;
      const bOrder = ItemSortOrder[b.item.name] ?? UNORDERED_ITEM_SORT_PRIORITY;
      return aOrder - bOrder;
    });

    const grouped = groupBy(sortedItems, (item) => item.contentId);
    return contentIds.map((id) => grouped[id] ?? []);
  });

  return {
    findManyByContentId: async (contentId: number) => loader.load(contentId),
  };
};

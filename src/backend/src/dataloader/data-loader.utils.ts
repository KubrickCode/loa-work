import _ from "lodash";
import DataLoader from "dataloader";
import { ItemSortOrder } from "src/content/shared/constants";
import { ManyLoader, UniqueLoader } from "./data-loader.types";

export const createUniqueLoader = <T extends { id: number }>(
  batchFn: (ids: readonly number[]) => Promise<T[]>,
  entityName: string
): UniqueLoader<T> => {
  const loader = new DataLoader<number, T>(async (ids) => {
    const items = await batchFn(ids);
    const itemsMap = _.keyBy(items, "id");
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

    const sortedItems = _.cloneDeep(items).sort((a, b) => {
      const aOrder = ItemSortOrder[a.item.name] || 999;
      const bOrder = ItemSortOrder[b.item.name] || 999;
      return aOrder - bOrder;
    });

    const grouped = _.groupBy(sortedItems, "contentId");
    return contentIds.map((id) => grouped[id] || []);
  });

  return {
    findManyByContentId: async (contentId: number) => loader.load(contentId),
  };
};

import { orderBy } from "es-toolkit/array";
import { get } from "es-toolkit/compat";
import { useCallback, useMemo, useState } from "react";

type SortOrder = "asc" | "desc" | null;

type UseTableSortOptions<T> = {
  columns: Array<{
    sortKey?: string;
    sortValue?: (data: T) => number | string | null;
  }>;
  defaultSorting?: {
    sortKey: string;
    value: "asc" | "desc";
  };
};

type UseTableSortReturn<T> = {
  currentSortKey: string | null;
  handleSort: (column: { sortKey?: string }) => void;
  sortOrder: SortOrder;
  sortRows: <R extends { data: T }>(rows: R[]) => R[];
};

export const useTableSort = <T,>({
  columns,
  defaultSorting,
}: UseTableSortOptions<T>): UseTableSortReturn<T> => {
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(
    defaultSorting?.sortKey || null
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSorting?.value || null);

  const handleSort = useCallback(
    (column: { sortKey?: string }) => {
      if (!column.sortKey) return;

      let newOrder: SortOrder;
      if (currentSortKey !== column.sortKey) {
        newOrder = "asc";
      } else if (sortOrder === "asc") {
        newOrder = "desc";
      } else if (sortOrder === "desc") {
        newOrder = null;
      } else {
        newOrder = "asc";
      }

      setCurrentSortKey(newOrder ? column.sortKey : null);
      setSortOrder(newOrder);
    },
    [currentSortKey, sortOrder]
  );

  const sortRows = useMemo(() => {
    const column = columns.find((col) => col.sortKey === currentSortKey);

    return <R extends { data: T }>(rows: R[]): R[] => {
      if (!currentSortKey || !sortOrder) return rows;

      return orderBy(
        rows,
        [
          (row) => {
            if (column?.sortValue) {
              return column.sortValue(row.data);
            }
            return get(row.data, currentSortKey);
          },
        ],
        [sortOrder]
      );
    };
  }, [columns, currentSortKey, sortOrder]);

  return {
    currentSortKey,
    handleSort,
    sortOrder,
    sortRows,
  };
};

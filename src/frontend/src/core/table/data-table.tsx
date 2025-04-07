import { Box, EmptyState, HStack, Table } from "@chakra-ui/react";
import _ from "lodash";
import {
  ReactNode,
  TableHTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "~/core/chakra-components/pagination";

import { FavoriteValue } from "./favorite-control";
import { SortControl } from "./sort-control";

export type DataTableProps<T> = TableHTMLAttributes<HTMLTableElement> & {
  columns: Column<T>[];
  defaultSorting?: {
    sortKey: string;
    value: "asc" | "desc";
  };
  getRowProps?: (row: { data: T; index: number }) => { [key: string]: any };
  rows: {
    data: T;
  }[];
  pagination?: boolean;
  favoriteKeyPath?: string;
  favorites?: FavoriteValue[];
};

export type Column<T> = {
  align?: "center" | "left" | "justify" | "right";
  header: ReactNode;
  render: (props: { data: T; rowIndex: number }) => JSX.Element | null;
  sortKey?: string;
  sortValue?: (data: T) => number | string | null;
  width?: Table.ColumnHeaderProps["width"];
};

// NOTE: 현재 해당 컴포넌트는 칼럼의 정렬 및 페이지네이션까지 모두 책임지고 있음.
// 이는 기본적으로 서버에서 책임지는 것이 좋으나, 현재 데이터가 많지 않은 테이블 위주로만 보여주고 있기 때문에 가볍게 사용할 수 있도록
// 클라이언트 사이드로 해당 기능들을 제공하도록 함. 이는 추후 변경될 수 있음.
export const DataTable = <T,>({
  columns,
  defaultSorting,
  getRowProps,
  rows,
  pagination = false,
  favoriteKeyPath,
  favorites = [],
  ...rest
}: DataTableProps<T>) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(
    defaultSorting?.value || null
  );
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(
    defaultSorting?.sortKey || null
  );

  const displayRows = useMemo(() => {
    if (!rows.length) return [];

    const hasFavoriteFeature = !!favoriteKeyPath && favorites.length > 0;

    let favoriteRows: typeof rows = [];
    let normalRows: typeof rows = [];

    if (hasFavoriteFeature) {
      favoriteRows = rows.filter((row) => {
        const value = favoriteKeyPath
          .split(".")
          .reduce(
            (obj, key) => obj && obj[key as keyof typeof obj],
            row.data as any
          );
        return value !== undefined && favorites.includes(value);
      });

      normalRows = rows.filter((row) => {
        const value = favoriteKeyPath
          .split(".")
          .reduce(
            (obj, key) => obj && obj[key as keyof typeof obj],
            row.data as any
          );
        return value === undefined || !favorites.includes(value);
      });
    } else {
      normalRows = [...rows];
    }

    const sortRows = (rowsToSort: typeof rows) => {
      if (!currentSortKey || !sortOrder) return rowsToSort;

      return _.orderBy(
        rowsToSort,
        [
          (row) => {
            const column = columns.find(
              (col) => col.sortKey === currentSortKey
            );
            if (column?.sortValue) {
              return column.sortValue(row.data);
            }
            return _.get(row.data, currentSortKey);
          },
        ],
        [sortOrder]
      );
    };

    if (hasFavoriteFeature) {
      const sortedFavoriteRows = sortRows(favoriteRows);
      const sortedNormalRows = sortRows(normalRows);
      return [...sortedFavoriteRows, ...sortedNormalRows];
    }

    return sortRows(rows);
  }, [rows, currentSortKey, sortOrder, columns, favoriteKeyPath, favorites]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortKey) return;

    let newOrder: "asc" | "desc" | null;
    if (currentSortKey !== column.sortKey) {
      newOrder = "asc";
    } else if (sortOrder === "asc") {
      newOrder = "desc";
    } else if (sortOrder === "desc") {
      newOrder = null;
    } else {
      newOrder = "asc";
    }

    setSortOrder(newOrder);
    setCurrentSortKey(newOrder ? column.sortKey : null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalItems = displayRows.length;

  const currentData = displayRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderColumn = useCallback(
    (
      row: DataTableProps<T>["rows"][number],
      rowIndex: number,
      column: DataTableProps<T>["columns"][number],
      columnIndex: number
    ) => {
      return (
        <Table.Cell
          alignItems="center"
          justifyContent="center"
          key={columnIndex}
          whiteSpace="nowrap"
          {...(column.align && { textAlign: column.align })}
        >
          {column.render({
            data: row.data,
            rowIndex,
          })}
        </Table.Cell>
      );
    },
    []
  );

  const hasData = rows.length > 0;
  const isInteractive =
    hasData &&
    getRowProps?.({ data: rows[0].data, index: 0 })?.onClick !== undefined;

  const renderRow = useCallback(
    (row: DataTableProps<T>["rows"][number], rowIndex: number) => {
      return (
        <Table.Row
          cursor={isInteractive ? "pointer" : "default"}
          key={rowIndex}
          {...(getRowProps && getRowProps({ data: row.data, index: rowIndex }))}
        >
          {columns.map((column, index) =>
            renderColumn(row, rowIndex, column, index)
          )}
        </Table.Row>
      );
    },
    [columns, renderColumn, getRowProps, isInteractive]
  );

  return (
    <Table.ScrollArea maxHeight="4xl" {...rest}>
      <Table.Root interactive={isInteractive} showColumnBorder stickyHeader>
        <Table.Header>
          <Table.Row>
            {hasData &&
              columns.map((column, index) => (
                <Table.ColumnHeader
                  key={index}
                  {...(column.align && { textAlign: column.align })}
                  {...(column.width && { width: column.width })}
                >
                  <Box
                    alignItems="center"
                    display="flex"
                    gap={1}
                    justifyContent={column.align}
                    whiteSpace="nowrap"
                  >
                    {column.header}
                    {column.sortKey && (
                      <SortControl
                        currentState={
                          currentSortKey === column.sortKey ? sortOrder : null
                        }
                        onClick={() => handleSort(column)}
                      />
                    )}
                  </Box>
                </Table.ColumnHeader>
              ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!hasData ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>
                <EmptyState.Root size="lg">
                  <EmptyState.Content py={24}>
                    <EmptyState.Description>
                      조회된 데이터가 없습니다
                    </EmptyState.Description>
                  </EmptyState.Content>
                </EmptyState.Root>
              </Table.Cell>
            </Table.Row>
          ) : pagination ? (
            currentData.map((row, index) => renderRow(row, index))
          ) : (
            displayRows.map((row, index) => renderRow(row, index))
          )}
        </Table.Body>
      </Table.Root>
      {pagination && hasData && (
        <PaginationRoot
          count={totalItems}
          onPageChange={({ page }) => setCurrentPage(page)}
          page={currentPage}
          pageSize={pageSize}
        >
          <HStack mt={4}>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      )}
    </Table.ScrollArea>
  );
};

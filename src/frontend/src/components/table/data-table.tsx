import { Box, EmptyState, HStack, Table } from "@chakra-ui/react";
import { orderBy, partition } from "es-toolkit/array";
import { get } from "es-toolkit/compat";
import { ReactNode, TableHTMLAttributes, useCallback, useMemo, useState } from "react";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "~/components/chakra/pagination";

import { FavoriteValue, getFavoriteRowStyles, isFavoriteValue } from "./favorite-control";
import { SortControl } from "./sort-control";

export type DataTableProps<T> = TableHTMLAttributes<HTMLTableElement> & {
  columns: Column<T>[];
  defaultSorting?: {
    sortKey: string;
    value: "asc" | "desc";
  };
  favoriteKeyPath?: string;
  favorites?: FavoriteValue[];
  getRowProps?: (row: { data: T; index: number }) => { [key: string]: any };
  pagination?: boolean;
  rows: {
    data: T;
  }[];
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
  favoriteKeyPath,
  favorites = [],
  getRowProps,
  pagination = false,
  rows,
  ...rest
}: DataTableProps<T>) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(defaultSorting?.value || null);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(
    defaultSorting?.sortKey || null
  );

  const displayRows = useMemo(() => {
    if (!rows.length) return [];

    const hasFavoriteFeature = !!favoriteKeyPath && favorites.length > 0;

    let favoriteRows: typeof rows = [];
    let normalRows: typeof rows = [];

    if (hasFavoriteFeature) {
      [favoriteRows, normalRows] = partition(rows, (row) => {
        const value = get(row.data, favoriteKeyPath);
        return (
          (typeof value === "string" || typeof value === "number") && favorites.includes(value)
        );
      });
    } else {
      normalRows = [...rows];
    }

    const sortRows = (rowsToSort: typeof rows) => {
      if (!currentSortKey || !sortOrder) return rowsToSort;

      return orderBy(
        rowsToSort,
        [
          (row) => {
            const column = columns.find((col) => col.sortKey === currentSortKey);
            if (column?.sortValue) {
              return column.sortValue(row.data);
            }
            return get(row.data, currentSortKey);
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

  const currentData = displayRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
          bg={{
            _dark: "transparent",
            _light: "transparent",
          }}
          borderBottom="1px solid"
          borderColor="border.subtle"
          color="text.primary"
          fontSize="sm"
          justifyContent="center"
          key={columnIndex}
          px={4}
          py={4}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
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
    hasData && getRowProps?.({ data: rows[0].data, index: 0 })?.onClick !== undefined;

  const renderRow = useCallback(
    (row: DataTableProps<T>["rows"][number], rowIndex: number) => {
      const isFavorite =
        !!favoriteKeyPath &&
        favorites.length > 0 &&
        isFavoriteValue(get(row.data, favoriteKeyPath), favorites);

      return (
        <Table.Row
          {...getFavoriteRowStyles(isFavorite, isInteractive)}
          cursor={isInteractive ? "pointer" : "default"}
          key={rowIndex}
          transition="all 0.3s ease-in-out"
          {...(getRowProps && getRowProps({ data: row.data, index: rowIndex }))}
        >
          {columns.map((column, index) => renderColumn(row, rowIndex, column, index))}
        </Table.Row>
      );
    },
    [columns, renderColumn, getRowProps, isInteractive, favoriteKeyPath, favorites]
  );

  return (
    <>
      <Box
        border="1px solid"
        borderColor="border.default"
        borderRadius="xl"
        boxShadow={{
          _dark: "lg",
          _light: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        }}
        overflow="hidden"
        overflowX="auto"
        width="100%"
      >
        <Table.ScrollArea maxHeight="4xl">
          <Table.Root
            bg="bg.elevated"
            interactive={false}
            minWidth="100%"
            showColumnBorder={false}
            stickyHeader
            width="100%"
            {...rest}
          >
            <Table.Header>
              <Table.Row
                bg={{
                  _dark: "bg.surface",
                  _light: "bg.muted",
                }}
                borderBottom="1px solid"
                borderColor="border.default"
              >
                {hasData &&
                  columns.map((column, index) => (
                    <Table.ColumnHeader
                      color="text.secondary"
                      fontSize="xs"
                      fontWeight="semibold"
                      key={index}
                      letterSpacing="wider"
                      px={4}
                      py={4}
                      textTransform="uppercase"
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
                            currentState={currentSortKey === column.sortKey ? sortOrder : null}
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
                        <EmptyState.Description>조회된 데이터가 없습니다</EmptyState.Description>
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
        </Table.ScrollArea>
      </Box>
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
    </>
  );
};

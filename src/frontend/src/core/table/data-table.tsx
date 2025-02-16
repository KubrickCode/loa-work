import { Box, HStack, Table } from "@chakra-ui/react";
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
} from "~/chakra-components/pagination";

import { SortControl } from "./sort-control";

export type DataTableProps<T> = TableHTMLAttributes<HTMLTableElement> & {
  columns: Column<T>[];
  defaultSorting?: {
    sortKey: string;
    value: "asc" | "desc";
  };
  rows: {
    data: T;
  }[];
  pagination?: boolean;
};

export type Column<T> = {
  align?: "center" | "left" | "justify" | "right";
  header: ReactNode;
  render: (props: { data: T; rowIndex: number }) => JSX.Element | null;
  sortKey?: string;
  sortValue?: (data: T) => number | string | null;
};

export const DataTable = <T,>({
  columns,
  defaultSorting,
  rows,
  pagination = false,
}: DataTableProps<T>) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(
    defaultSorting?.value || null
  );
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(
    defaultSorting?.sortKey || null
  );

  const displayRows = useMemo(() => {
    if (currentSortKey && sortOrder) {
      return _.orderBy(
        rows,
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
    }
    return rows;
  }, [rows, currentSortKey, sortOrder, columns]);

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

  const renderRow = useCallback(
    (row: DataTableProps<T>["rows"][number], rowIndex: number) => {
      return (
        <Table.Row key={rowIndex}>
          {columns.map((column, index) =>
            renderColumn(row, rowIndex, column, index)
          )}
        </Table.Row>
      );
    },
    [columns, renderColumn]
  );

  return (
    <Table.ScrollArea maxHeight="4xl">
      <Table.Root showColumnBorder stickyHeader striped>
        <Table.Header>
          <Table.Row>
            {columns.map((column, index) => (
              <Table.ColumnHeader
                key={index}
                {...(column.align && { textAlign: column.align })}
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
          {pagination
            ? currentData.map((row, index) => renderRow(row, index))
            : displayRows.map((row, index) => renderRow(row, index))}
        </Table.Body>
      </Table.Root>
      {pagination && (
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

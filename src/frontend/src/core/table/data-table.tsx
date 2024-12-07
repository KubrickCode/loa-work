import { Box, Table } from "@chakra-ui/react";
import _ from "lodash";
import { TableHTMLAttributes, useCallback, useMemo, useState } from "react";
import { SortControl } from "./sort-control";

export type DataTableProps<T> = TableHTMLAttributes<HTMLTableElement> & {
  columns: Column<T>[];
  rows: {
    data: T;
  }[];
};

export type Column<T> = {
  align?: "center" | "left" | "justify" | "right";
  header: string;
  render: (props: { data: T; rowIndex: number }) => JSX.Element | null;
  sortKey?: string;
};

export const DataTable = <T,>({ columns, rows }: DataTableProps<T>) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);

  const displayRows = useMemo(() => {
    if (currentSortKey && sortOrder) {
      return _.orderBy(
        rows,
        [(row) => _.get(row.data, currentSortKey)],
        [sortOrder]
      );
    }
    return rows;
  }, [rows, currentSortKey, sortOrder]);

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

  const renderColumn = useCallback(
    (
      row: DataTableProps<T>["rows"][number],
      rowIndex: number,
      column: DataTableProps<T>["columns"][number],
      columnIndex: number
    ) => {
      return (
        <Table.Cell
          key={columnIndex}
          alignItems="center"
          justifyContent="center"
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
    <Box overflowX="auto">
      <Table.Root striped>
        <Table.Header>
          <Table.Row>
            {columns.map((column, index) => (
              <Table.ColumnHeader
                key={index}
                {...(column.align && { textAlign: column.align })}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  justifyContent={column.align}
                  whiteSpace="nowrap"
                >
                  {column.header}
                  {column.sortKey && (
                    <SortControl
                      onClick={() => handleSort(column)}
                      currentState={
                        currentSortKey === column.sortKey ? sortOrder : null
                      }
                    />
                  )}
                </Box>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {displayRows.map((row, index) => renderRow(row, index))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

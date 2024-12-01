import { Flex, Table } from "@chakra-ui/react";
import _ from "lodash";
import { TableHTMLAttributes, useCallback, useState } from "react";
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
  sortKey?: keyof T;
};

export const DataTable = <T,>({ columns, rows }: DataTableProps<T>) => {
  const [sortedRows, setSortedRows] = useState(rows);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentSortKey, setCurrentSortKey] = useState<keyof T | null>(null);

  const handleSort = (column: Column<T>) => {
    if (!column.sortKey) return;

    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = _.orderBy(
      sortedRows,
      [(row) => row.data[column.sortKey as keyof T]],
      [newOrder]
    );

    setSortedRows(sorted);
    setSortOrder(newOrder);
    setCurrentSortKey(column.sortKey);
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
    [columns, renderColumn, sortedRows]
  );

  return (
    <>
      <Table.Root striped>
        <Table.Header>
          <Table.Row>
            {columns.map((column, index) => (
              <Table.ColumnHeader
                key={index}
                {...(column.align && { textAlign: column.align })}
              >
                <Flex alignItems="center" gap={1}>
                  {column.header}
                  {column.sortKey && (
                    <SortControl
                      onClick={() => handleSort(column)}
                      currentState={
                        currentSortKey === column.sortKey ? sortOrder : null
                      }
                    />
                  )}
                </Flex>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.map((row, index) => renderRow(row, index))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

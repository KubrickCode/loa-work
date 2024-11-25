import { Table } from "@chakra-ui/react";
import _ from "lodash";
import { TableHTMLAttributes, useCallback } from "react";

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
};

export const DataTable = <T,>({ columns, rows }: DataTableProps<T>) => {
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
    [columns, renderColumn, rows]
  );

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns.map((column, index) => (
              <Table.ColumnHeader
                key={index}
                {...(column.align && { textAlign: column.align })}
              >
                {column.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, index) => renderRow(row, index))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

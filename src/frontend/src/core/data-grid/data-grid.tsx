import { SimpleGrid, Box, SimpleGridProps } from "@chakra-ui/react";
import { DataList } from "@chakra-ui/react";
import { ReactNode } from "react";

export type DataGridProps = {
  columns?: SimpleGridProps["columns"];
  items: {
    label: string;
    value: ReactNode;
  }[];
};

export const DataGrid = ({
  items,
  columns = { base: 1, md: 2, lg: 3 },
}: DataGridProps) => {
  return (
    <SimpleGrid columns={columns}>
      {items.map((item, index) => (
        <Box key={index}>
          <DataList.Root size="sm">
            <DataList.Item>
              <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
              <DataList.ItemValue>{item.value}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </Box>
      ))}
    </SimpleGrid>
  );
};

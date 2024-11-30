import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";

import { SkeletonText } from "~/chakra-components/ui/skeleton";
import {
  ContentType,
  ContentWageListTableDocument,
} from "~/core/graphql/generated";
import { DataTable } from "~/core/table";

type ContentWageListTableProps = {
  contentType?: ContentType;
};

export const ContentWageListTable = ({
  contentType,
}: ContentWageListTableProps) => {
  const { data, error, loading } = useQuery(ContentWageListTableDocument, {
    variables: {
      filter: {
        contentType,
      },
    },
  });

  if (loading)
    return (
      <Box p={4}>
        <SkeletonText noOfLines={30} gap="4" p={4} />
      </Box>
    );
  if (error) return <>{error.message}</>;
  if (!data) throw new Error("NO DATA");

  return (
    <DataTable
      columns={[
        {
          header: "종류",
          render({ data }) {
            return <>{data.displayTypeName}</>;
          },
        },
        {
          header: "이름",
          render({ data }) {
            return <>{data.displayName}</>;
          },
        },
        {
          header: "시급",
          render({ data }) {
            return <>{data.wage}</>;
          },
        },
      ]}
      rows={data.contentList.map((content) => ({
        data: content,
      }))}
    />
  );
};

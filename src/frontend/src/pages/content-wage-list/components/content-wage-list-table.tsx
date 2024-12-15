import {
  ContentWageListTableDocument,
  ContentWageListTableQuery,
} from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { useContentWageListTable } from "./content-wage-list-table-context";
import { useSafeQuery } from "~/core/graphql";
import { FormatNumber, IconButton } from "@chakra-ui/react";
import { FormatGold } from "~/core/format";
import { useAuth } from "~/core/auth";
import { DialogTrigger } from "~/core/dialog";
import { UserContentDurationEditDialog } from "./user-content-duration-edit-dialog";
import { IoIosSettings } from "react-icons/io";
import { useEffect } from "react";

export const ContentWageListTable = () => {
  const { isAuthenticated } = useAuth();
  const {
    contentCategoryId,
    includeIsSeeMore,
    includeIsBound,
    includeContentRewardItemIds,
    setRefetchTable,
  } = useContentWageListTable();
  const { data, refetch } = useSafeQuery(ContentWageListTableDocument, {
    variables: {
      filter: {
        contentCategoryId,
        includeIsSeeMore,
        includeIsBound,
        includeContentRewardItemIds,
      },
    },
  });

  useEffect(() => {
    setRefetchTable(() => refetch);
  }, [refetch, setRefetchTable]);

  return (
    <DataTable
      columns={[
        ...(isAuthenticated
          ? [
              {
                header: "",
                render({
                  data,
                }: {
                  data: ContentWageListTableQuery["contentWageList"][number];
                }) {
                  return (
                    <DialogTrigger
                      dialog={
                        <UserContentDurationEditDialog
                          contentDurationId={data.content.contentDuration.id}
                          onComplete={refetch}
                        />
                      }
                      trigger={
                        <IconButton size="xs" variant="surface">
                          <IoIosSettings />
                        </IconButton>
                      }
                    />
                  );
                },
              },
            ]
          : []),
        {
          header: "종류",
          render({ data }) {
            return <>{data.content.contentCategory.name}</>;
          },
        },
        {
          header: "이름",
          render({ data }) {
            return <>{data.content.displayName}</>;
          },
        },
        {
          align: "right",
          header: "소요시간",
          render({ data }) {
            return <>{data.content.durationText}</>;
          },
        },
        {
          align: "right",
          header: "시급(KRW)",
          render({ data }) {
            return (
              <FormatNumber
                currency="KRW"
                style="currency"
                value={data.krwAmount}
              />
            );
          },
          sortKey: "krwAmount",
        },
        {
          align: "right",
          header: "시급(골드)",
          render({ data }) {
            return <FormatGold value={data.goldAmount} />;
          },
          sortKey: "goldAmount",
        },
      ]}
      rows={data.contentWageList.map((data) => ({
        data,
      }))}
    />
  );
};

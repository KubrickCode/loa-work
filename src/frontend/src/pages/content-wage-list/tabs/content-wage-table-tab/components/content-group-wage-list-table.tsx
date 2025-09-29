import { Flex, FormatNumber, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { Dialog, useDialog } from "~/core/dialog";
import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentGroupWageListTableDocument,
  ContentStatus,
} from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import {
  FavoriteIcon,
  FavoriteValue,
  getFavoritesFromStorage,
} from "~/core/table/favorite-control";
import { LoginTooltip } from "~/core/tooltip";
import { useContentWageListPage } from "~/pages/content-wage-list/content-wage-list-page-context";
import {
  ContentGroupDetailsDialog,
  ContentGroupDurationEditDialog,
} from "~/shared/content";
import { ItemNameWithImage } from "~/shared/item";

const FAVORITE_STORAGE_KEY = "content-group-wage-list-favorites";

export const ContentGroupWageListTable = () => {
  const { isAuthenticated } = useAuth();
  const {
    contentCategoryId,
    keyword,
    includeIsSeeMore,
    includeIsBound,
    includeItemIds,
    shouldMergeGate,
  } = useContentWageListPage();

  const [favorites, setFavorites] = useState<FavoriteValue[]>(
    getFavoritesFromStorage(FAVORITE_STORAGE_KEY)
  );

  const handleFavoriteChange = (newFavorites: FavoriteValue[]) => {
    setFavorites(newFavorites);
  };

  const { data, refetch } = useSafeQuery(ContentGroupWageListTableDocument, {
    variables: {
      filter: {
        contentCategoryId,
        keyword,
        includeIsSeeMore,
        includeIsBound,
        includeItemIds,
        status: ContentStatus.ACTIVE,
      },
    },
  });

  const { onOpen, renderModal } = useDialog({
    dialog: ContentGroupDetailsDialog,
  });

  if (!shouldMergeGate || !data) return null;

  return (
    <>
      <DataTable
        columns={[
          {
            align: "center",
            header: "즐겨찾기",
            render({ data }) {
              return (
                <FavoriteIcon
                  externalFavorites={favorites}
                  id={data.contentGroup.contentIds.join("-")}
                  onChange={handleFavoriteChange}
                  storageKey={FAVORITE_STORAGE_KEY}
                />
              );
            },
            width: 12,
          },
          {
            header: "종류",
            render({ data }) {
              return (
                <ItemNameWithImage
                  name={data.contentGroup.contentCategory.name}
                  src={data.contentGroup.contentCategory.imageUrl}
                />
              );
            },
          },
          {
            header: "레벨",
            render({ data }) {
              return <>{data.contentGroup.level}</>;
            },
            sortKey: "contentGroup.level",
          },
          {
            header: "이름",
            render({ data }) {
              return <>{data.contentGroup.name}</>;
            },
          },
          {
            align: "right",
            header: "소요시간",
            render({ data }) {
              return (
                <Flex alignItems="center" display="inline-flex" gap={2}>
                  <Text>{data.contentGroup.durationText}</Text>
                  <Dialog.Trigger
                    dialog={ContentGroupDurationEditDialog}
                    dialogProps={{
                      contentIds: data.contentGroup.contentIds,
                      onComplete: refetch,
                    }}
                    disabled={!isAuthenticated}
                  >
                    <LoginTooltip>
                      <IconButton
                        disabled={!isAuthenticated}
                        size="2xs"
                        variant="surface"
                      >
                        <IoIosSettings />
                      </IconButton>
                    </LoginTooltip>
                  </Dialog.Trigger>
                </Flex>
              );
            },
          },
          {
            align: "right",
            header: "시급(원)",
            render({ data }) {
              return (
                <FormatNumber
                  currency="KRW"
                  style="currency"
                  value={data.krwAmountPerHour}
                />
              );
            },
            sortKey: "krwAmountPerHour",
          },
          {
            align: "right",
            header: "시급(골드)",
            render({ data }) {
              return <FormatGold value={data.goldAmountPerHour} />;
            },
            sortKey: "goldAmountPerHour",
          },
          {
            align: "right",
            header: "1수당 골드",
            render({ data }) {
              return <FormatGold value={data.goldAmountPerClear} />;
            },
            sortKey: "goldAmountPerClear",
          },
        ]}
        favoriteKeyPath="contentGroup.contentIds"
        favorites={favorites}
        getRowProps={({ data }) => ({
          onClick: () =>
            onOpen({
              contentIds: data.contentGroup.contentIds,
              onComplete: refetch,
            }),
          style: favorites.includes(data.contentGroup.contentIds.join("-"))
            ? { backgroundColor: "var(--chakra-colors-bg-favorite)" }
            : undefined,
        })}
        rows={data.contentGroupWageList.map((data) => ({
          data,
        }))}
      />
      {renderModal()}
    </>
  );
};

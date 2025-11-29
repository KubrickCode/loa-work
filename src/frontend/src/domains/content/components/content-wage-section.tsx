import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { IoFilter } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

import { Button } from "~/components/chakra/ui/button";
import { Field } from "~/components/chakra/ui/field";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/components/chakra/ui/popover";
import { DataGrid } from "~/components/data-grid";
import { Dialog } from "~/components/dialog";
import { TextLoader } from "~/components/loader";
import { Section } from "~/components/section";
import { LoginTooltip } from "~/components/tooltip";
import { useAuth } from "~/libs/auth";
import { useSafeQuery } from "~/libs/graphql";
import { ContentDetailsDialogWageSectionDocument } from "~/libs/graphql/generated";

import { ContentDurationEditDialog } from "../content-duration-edit-dialog";
import { BooleanFilter, ItemsFilter } from "../filters";
import { useWageFilter } from "../hooks";
import { RewardItem } from "../types";

type ContentWageSectionProps = {
  contentId: number;
  items: RewardItem[];
};

export const ContentWageSection = ({ contentId, items }: ContentWageSectionProps) => {
  const filter = useWageFilter(items);

  return (
    <Section
      title={
        <Flex alignItems="center" gap={4}>
          시급 정보{" "}
          <PopoverRoot positioning={{ placement: "right-end" }}>
            <PopoverTrigger asChild>
              <Button size="xs" variant="outline">
                <IoFilter />
                필터
              </Button>
            </PopoverTrigger>
            <PopoverContent portalled={false}>
              <PopoverArrow />
              <PopoverBody>
                <Flex direction="column" gap={4}>
                  <Field label="컨텐츠 보상 종류" w="auto">
                    <ItemsFilter
                      items={items}
                      onChange={filter.setIncludeItemIds}
                      value={filter.includeItemIds}
                    />
                  </Field>
                  <Field label="더보기 포함 여부" w="auto">
                    <BooleanFilter
                      onChange={filter.setIncludeSeeMore}
                      value={filter.includeSeeMore}
                    />
                  </Field>
                  <Field label="귀속 재료 포함 여부" w="auto">
                    <BooleanFilter onChange={filter.setIncludeBound} value={filter.includeBound} />
                  </Field>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </Flex>
      }
    >
      <Suspense fallback={<TextLoader />}>
        <ContentWageDataGrid
          contentId={contentId}
          includeBound={filter.includeBound}
          includeItemIds={filter.includeItemIds}
          includeSeeMore={filter.includeSeeMore}
        />
      </Suspense>
    </Section>
  );
};

type ContentWageDataGridProps = {
  contentId: number;
  includeBound: boolean;
  includeItemIds: number[];
  includeSeeMore: boolean;
};

const ContentWageDataGrid = ({
  contentId,
  includeBound,
  includeItemIds,
  includeSeeMore,
}: ContentWageDataGridProps) => {
  const { isAuthenticated } = useAuth();
  const { data, refetch } = useSafeQuery(ContentDetailsDialogWageSectionDocument, {
    variables: {
      contentId,
      filter: {
        includeBound,
        includeItemIds,
        includeSeeMore,
      },
    },
  });

  const wageItems = [
    {
      label: "소요 시간",
      value: (
        <Flex alignItems="center" gap={2}>
          <Text>{data.content.durationText}</Text>
          <Dialog.Trigger
            dialog={ContentDurationEditDialog}
            dialogProps={{
              contentId,
              onComplete: refetch,
            }}
            disabled={!isAuthenticated}
          >
            <LoginTooltip>
              <IconButton
                disabled={!isAuthenticated}
                h={4}
                minW={4}
                p={0}
                size="2xs"
                variant="ghost"
              >
                <LuPencilLine />
              </IconButton>
            </LoginTooltip>
          </Dialog.Trigger>
        </Flex>
      ),
    },
    { label: "시급(원)", value: data.content.wage.krwAmountPerHour },
    { label: "시급(골드)", value: data.content.wage.goldAmountPerHour },
    { label: "1수당 골드", value: data.content.wage.goldAmountPerClear },
  ];

  return <DataGrid items={wageItems} />;
};

import { ContentCategoryFilter } from "~/shared/content";
import { useContentWageListTable } from "./content-wage-list-table-context";
import { Box, Flex } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/chakra-components/ui/popover";
import { Button } from "~/chakra-components/ui/button";
import { IoFilter } from "react-icons/io5";
import { Field } from "~/chakra-components/ui/field";
import { SegmentedControl } from "~/chakra-components/ui/segmented-control";
import { MultiSelect } from "~/core/select";

export const ContentWageListTableFilters = () => {
  const { contentCategoryId, setContentCategoryId } = useContentWageListTable();

  const handleCategoryChange = (value: string | null) => {
    setContentCategoryId(value || null);
  };

  return (
    <Box>
      <PopoverRoot positioning={{ placement: "bottom-end" }}>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            <IoFilter />
            필터
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Flex direction="column" gap={4}>
              <Field label="컨텐츠 종류">
                <ContentCategoryFilter
                  onChange={handleCategoryChange}
                  value={contentCategoryId}
                />
              </Field>
              <Field label="컨텐츠 보상 종류">
                <ContentRewardItemsFilter />
              </Field>
              <Field label="더보기 포함 여부">
                <ContentSeeMoreFilter />
              </Field>
              <Field label="귀속 재료 포함 여부">
                <ContentIsBoundFilter />
              </Field>
            </Flex>
          </PopoverBody>
          <PopoverCloseTrigger />
        </PopoverContent>
      </PopoverRoot>
    </Box>
  );
};

const ContentSeeMoreFilter = () => {
  const { includeIsSeeMore, setIncludeIsSeeMore } = useContentWageListTable();

  return (
    <SegmentedControl
      items={[
        { label: "미포함", value: "false" },
        { label: "포함", value: "true" },
      ]}
      onValueChange={(e) => setIncludeIsSeeMore(e.value === "true")}
      value={includeIsSeeMore ? "true" : "false"}
    />
  );
};

const ContentIsBoundFilter = () => {
  const { includeIsBound, setIncludeIsBound } = useContentWageListTable();

  return (
    <SegmentedControl
      items={[
        { label: "미포함", value: "false" },
        { label: "포함", value: "true" },
      ]}
      onValueChange={(e) => setIncludeIsBound(e.value === "true")}
      value={includeIsBound ? "true" : "false"}
    />
  );
};

const ContentRewardItemsFilter = () => {
  const {
    contentRewardItems,
    includeContentRewardItemIds,
    setIncludeContentRewardItemIds,
  } = useContentWageListTable();

  const items = contentRewardItems.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return (
    <MultiSelect
      items={items}
      onChange={setIncludeContentRewardItemIds}
      placeholder="보상 아이템 선택"
      value={includeContentRewardItemIds}
    />
  );
};

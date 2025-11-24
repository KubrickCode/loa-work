import { Flex } from "@chakra-ui/react";
import { IoFilter } from "react-icons/io5";

import { Button } from "~/core/chakra-components/ui/button";
import { Field } from "~/core/chakra-components/ui/field";
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/core/chakra-components/ui/popover";
import { SegmentedControl } from "~/core/chakra-components/ui/segmented-control";
import { Form } from "~/core/form";
import { MultiSelect } from "~/core/select";
import { useContentWageListPage } from "~/pages/content-wage-list/content-wage-list-page-context";
import { ContentCategoryFilter } from "~/shared/content";

export const ContentWageListFilters = () => {
  const {
    contentCategoryId,
    keyword,
    setContentCategoryId,
    setKeyword,
    setShouldMergeGate,
    shouldMergeGate,
  } = useContentWageListPage();

  const handleCategoryChange = (value: number | null) => {
    setContentCategoryId(value || null);
  };

  return (
    <Flex gap={2}>
      <Form.SearchInput onSearch={setKeyword} value={keyword} />
      <PopoverRoot positioning={{ placement: "bottom-end" }}>
        <PopoverTrigger asChild>
          <Button size="xs" variant="outline">
            <IoFilter />
            필터
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Flex direction="column" gap={4}>
              <Field label="컨텐츠 종류">
                <ContentCategoryFilter onChange={handleCategoryChange} value={contentCategoryId} />
              </Field>
              <Field label="컨텐츠 보상 종류">
                <ItemsFilter />
              </Field>
              <Field label="더보기 포함 여부">
                <ContentSeeMoreFilter />
              </Field>
              <Field label="귀속 재료 포함 여부">
                <ContentIsBoundFilter />
              </Field>
              <Field label="관문 합쳐보기">
                <SegmentedControl
                  items={[
                    { label: "합쳐보기", value: "true" },
                    { label: "분리하기", value: "false" },
                  ]}
                  onValueChange={(e) => setShouldMergeGate(e.value === "true")}
                  value={shouldMergeGate ? "true" : "false"}
                />
              </Field>
            </Flex>
          </PopoverBody>
          <PopoverCloseTrigger />
        </PopoverContent>
      </PopoverRoot>
    </Flex>
  );
};

const ContentSeeMoreFilter = () => {
  const { includeSeeMore, setIncludeSeeMore } = useContentWageListPage();

  return (
    <SegmentedControl
      items={[
        { label: "미포함", value: "false" },
        { label: "포함", value: "true" },
      ]}
      onValueChange={(e) => setIncludeSeeMore(e.value === "true")}
      value={includeSeeMore ? "true" : "false"}
    />
  );
};

const ContentIsBoundFilter = () => {
  const { includeBound, setIncludeBound } = useContentWageListPage();

  return (
    <SegmentedControl
      items={[
        { label: "미포함", value: "false" },
        { label: "포함", value: "true" },
      ]}
      onValueChange={(e) => setIncludeBound(e.value === "true")}
      value={includeBound ? "true" : "false"}
    />
  );
};

const ItemsFilter = () => {
  const { includeItemIds, items: rewardItems, setIncludeItemIds } = useContentWageListPage();

  const items = rewardItems.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return (
    <MultiSelect
      items={items}
      onChange={setIncludeItemIds}
      placeholder="보상 아이템 선택"
      value={includeItemIds}
    />
  );
};

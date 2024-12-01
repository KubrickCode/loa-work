import { ContentCategoryFilter } from "~/shared/content";
import { useContentWageListTable } from "./content-wage-list-table-context";
import { Select } from "~/core/select";
import { Flex } from "@chakra-ui/react";

export const ContentWageListTableFilters = () => {
  const { contentCategoryId, setContentCategoryId } = useContentWageListTable();

  const handleCategoryChange = (value: string) => {
    setContentCategoryId(value || undefined);
  };

  return (
    <Flex gap={2}>
      <ContentCategoryFilter
        onChange={handleCategoryChange}
        value={contentCategoryId ? [contentCategoryId] : [""]}
      />
      <ContentSeeMoreFilter />
      <ContentIsBoundFilter />
    </Flex>
  );
};

const ContentSeeMoreFilter = () => {
  const { includeIsSeeMore, setIncludeIsSeeMore } = useContentWageListTable();

  const items = [
    { label: "더보기 미포함", value: "false" },
    { label: "더보기 포함", value: "true" },
  ];

  return (
    <Select
      items={items}
      onChange={(value) => setIncludeIsSeeMore(value === "true")}
      placeholder="컨텐츠 종류"
      value={includeIsSeeMore ? ["true"] : ["false"]}
    />
  );
};

const ContentIsBoundFilter = () => {
  const { includeIsBound, setIncludeIsBound } = useContentWageListTable();

  const items = [
    { label: "귀속 재료 미포함", value: "false" },
    { label: "귀속 재료 포함", value: "true" },
  ];

  return (
    <Select
      items={items}
      onChange={(value) => setIncludeIsBound(value === "true")}
      placeholder="귀속 재료"
      value={includeIsBound ? ["true"] : ["false"]}
    />
  );
};

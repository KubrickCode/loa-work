import { ContentCategoryFilter } from "~/shared/content";
import { useContentWageListTable } from "./content-wage-list-table-context";
import { Select } from "~/core/select";
import { Box, Flex } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/chakra-components/ui/popover";
import { Button } from "~/chakra-components/ui/button";
import { IoFilter } from "react-icons/io5";
import { Field } from "~/chakra-components/ui/field";

export const ContentWageListTableFilters = () => {
  const { contentCategoryId, setContentCategoryId } = useContentWageListTable();

  const handleCategoryChange = (value: string) => {
    setContentCategoryId(value || undefined);
  };

  return (
    <Box>
      <PopoverRoot>
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
                  value={contentCategoryId ? [contentCategoryId] : [""]}
                />
              </Field>
              <Field label="더보기 포함 여부">
                <ContentSeeMoreFilter />
              </Field>
              <Field label="귀속 재료 포함 여부">
                <ContentIsBoundFilter />
              </Field>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </Box>
  );
};

const ContentSeeMoreFilter = () => {
  const { includeIsSeeMore, setIncludeIsSeeMore } = useContentWageListTable();

  const items = [
    { label: "미포함", value: "false" },
    { label: "포함", value: "true" },
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
    { label: "미포함", value: "false" },
    { label: "포함", value: "true" },
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

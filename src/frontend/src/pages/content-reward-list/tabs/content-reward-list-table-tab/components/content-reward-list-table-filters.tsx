import { Flex } from "@chakra-ui/react";

import { Form } from "~/core/form";
import { ContentCategoryFilter } from "~/shared/content";

import { useContentRewardListPage } from "../../../content-reward-list-page-context";

export const ContentRewardListTableFilters = () => {
  const { contentCategoryId, keyword, setContentCategoryId, setKeyword } =
    useContentRewardListPage();

  return (
    <Flex alignItems="center" gap={2}>
      <Form.SearchInput onSearch={setKeyword} value={keyword} />
      <ContentCategoryFilter
        onChange={setContentCategoryId}
        value={contentCategoryId}
      />
    </Flex>
  );
};

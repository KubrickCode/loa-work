import { ContentCategoryFilter } from "~/shared/content";

import { useContentRewardListPage } from "../../../content-reward-list-page-context";

export const ContentRewardListTableFilter = () => {
  const { contentCategoryId, setContentCategoryId } =
    useContentRewardListPage();

  return (
    <ContentCategoryFilter
      onChange={setContentCategoryId}
      value={contentCategoryId}
    />
  );
};

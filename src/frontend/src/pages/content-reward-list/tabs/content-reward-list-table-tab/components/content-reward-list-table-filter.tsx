import { ContentCategoryFilter } from "~/shared/content";
import { useContentRewardListTable } from "./content-reward-list-table-context";

export const ContentRewardListTableFilter = () => {
  const { contentCategoryId, setContentCategoryId } =
    useContentRewardListTable();

  return (
    <ContentCategoryFilter
      onChange={setContentCategoryId}
      value={contentCategoryId}
    />
  );
};

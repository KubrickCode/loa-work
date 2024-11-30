import { ContentCategoryFilter } from "~/shared/content";
import { useContentRewardListTable } from "./content-reward-list-table-context";

export const ContentRewardListTableFilter = () => {
  const { contentCategoryId, setContentCategoryId } =
    useContentRewardListTable();

  const handleCategoryChange = (value: string) => {
    setContentCategoryId(value || undefined);
  };

  return (
    <ContentCategoryFilter
      onChange={handleCategoryChange}
      value={contentCategoryId ? [contentCategoryId] : [""]}
    />
  );
};

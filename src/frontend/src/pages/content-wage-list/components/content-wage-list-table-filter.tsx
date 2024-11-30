import { ContentCategoryFilter } from "~/shared/content";
import { useContentWageListTable } from "./content-wage-list-table-context";

export const ContentWageListTableFilter = () => {
  const { contentCategoryId, setContentCategoryId } = useContentWageListTable();

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

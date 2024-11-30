import { ContentCategoryFilter } from "~/shared/content";
import { useSearchParams } from "react-router-dom";

export const ContentRewardListTableFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const contentCategoryId = searchParams.get("contentCategoryId");

  const handleCategoryChange = (value: string) => {
    if (value === "") {
      searchParams.delete("contentCategoryId");
    } else {
      searchParams.set("contentCategoryId", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <ContentCategoryFilter
      onChange={handleCategoryChange}
      value={contentCategoryId ? [contentCategoryId] : [""]}
    />
  );
};

import { StringParam, useQueryParams } from "use-query-params";
import { ContentCategoryFilter } from "~/shared/content";

export const ContentRewardListTableFilter = () => {
  const [query, setQuery] = useQueryParams({
    contentCategoryId: StringParam,
  });

  const handleCategoryChange = (value: string) => {
    setQuery({ contentCategoryId: value || undefined });
  };

  return (
    <ContentCategoryFilter
      onChange={handleCategoryChange}
      value={query.contentCategoryId ? [query.contentCategoryId] : [""]}
    />
  );
};

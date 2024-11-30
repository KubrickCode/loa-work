import { useQuery } from "@apollo/client";

import { ContentCategoriesDocument } from "~/core/graphql/generated";
import { Loader } from "~/core/loader";
import { Select } from "~/core/select";

type ContentCategoryFilterProps = {
  onChange: (value: string) => void;
  value: string[];
};

export const ContentCategoryFilter = ({
  onChange,
  value,
}: ContentCategoryFilterProps) => {
  const { data, loading, error } = useQuery(ContentCategoriesDocument);

  if (loading) return <Loader.Select />;
  if (error) return <>{error.message}</>;
  if (!data) throw new Error("NO DATA");

  const items = [
    { label: "전체 컨텐츠", value: "" },
    ...data.contentCategories.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    })),
  ];

  return (
    <Select
      items={items}
      onChange={onChange}
      placeholder="컨텐츠 종류"
      value={value}
    />
  );
};

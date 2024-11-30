import { Suspense } from "react";

import { useSafeQuery } from "~/core/graphql";
import { ContentCategoriesDocument } from "~/core/graphql/generated";
import { Loader } from "~/core/loader";
import { Select } from "~/core/select";

type ContentCategoryFilterProps = {
  onChange: (value: string) => void;
  value: string[];
};

export const ContentCategoryFilter = (props: ContentCategoryFilterProps) => {
  return (
    <Suspense fallback={<Loader.Select />}>
      <WrappedContentCategoryFilter {...props} />
    </Suspense>
  );
};

const WrappedContentCategoryFilter = ({
  onChange,
  value,
}: ContentCategoryFilterProps) => {
  const { data } = useSafeQuery(ContentCategoriesDocument);

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

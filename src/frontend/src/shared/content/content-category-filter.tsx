import { Suspense } from "react";

import { useSafeQuery } from "~/core/graphql";
import { ContentCategoriesDocument } from "~/core/graphql/generated";
import { SelectLoader } from "~/core/loader";
import { Select } from "~/core/select";

type ContentCategoryFilterProps = {
  onChange: (value: number | null) => void;
  value: number | null;
};

export const ContentCategoryFilter = (props: ContentCategoryFilterProps) => {
  return (
    <Suspense fallback={<SelectLoader />}>
      <WrappedContentCategoryFilter {...props} />
    </Suspense>
  );
};

const WrappedContentCategoryFilter = ({ onChange, value }: ContentCategoryFilterProps) => {
  const { data } = useSafeQuery(ContentCategoriesDocument);

  const items = [
    { label: "전체", value: null },
    ...data.contentCategories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  ];

  return <Select items={items} onChange={onChange} placeholder="컨텐츠 종류" value={value} />;
};

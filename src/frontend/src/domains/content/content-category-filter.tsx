import { Suspense } from "react";

import { SelectLoader } from "~/components/loader";
import { Select } from "~/components/select";
import { useSafeQuery } from "~/libs/graphql";
import { ContentCategoriesDocument } from "~/libs/graphql/generated";

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

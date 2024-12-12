import { Suspense } from "react";
import { useSafeQuery } from "~/core/graphql";
import { ContentCategoriesDocument } from "~/core/graphql/generated";
import { Loader } from "~/core/loader";
import { Select } from "~/core/select";

type ContentCategoryFilterProps = {
  onChange: (value: string | null) => void;
  value: string | null;
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
    { label: "전체", value: "" },
    ...data.contentCategories.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    })),
  ];

  return (
    <Select<string>
      items={items}
      onChange={onChange}
      placeholder="컨텐츠 종류"
      value={value}
    />
  );
};

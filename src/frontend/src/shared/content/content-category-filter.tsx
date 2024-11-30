import { useQuery } from "@apollo/client";
import { createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/chakra-components/ui/select";
import { ContentCategoriesDocument } from "~/core/graphql/generated";

type ContentCategoryFilterProps = {
  onChange: (value: string) => void;
  value: string[];
};

export const ContentCategoryFilter = ({
  onChange,
  value,
}: ContentCategoryFilterProps) => {
  const { data, loading, error } = useQuery(ContentCategoriesDocument);

  if (loading) return <></>;
  if (error) return <>{error.message}</>;
  if (!data) throw new Error("NO DATA");

  const items = [
    { label: "전체 컨텐츠", value: "" },
    ...data.contentCategories.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    })),
  ];

  const frameworks = createListCollection({
    items,
  });

  return (
    <SelectRoot
      collection={frameworks}
      maxWidth="10rem"
      onValueChange={({ value }) => onChange(value[0])}
      size="xs"
      value={value}
    >
      <SelectTrigger>
        <SelectValueText placeholder="컨텐츠 종류" />
      </SelectTrigger>
      <SelectContent>
        {frameworks.items.map((movie) => (
          <SelectItem item={movie} key={movie.value}>
            {movie.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

import { DataGrid } from "~/components/data-grid";
import { Section } from "~/components/section";

import { ItemNameWithImage } from "../../item";

type ContentBasicInfoSectionProps = {
  content: {
    contentCategory: {
      imageUrl: string;
      name: string;
    };
    displayName: string;
    level: number;
  };
};

export const ContentBasicInfoSection = ({ content }: ContentBasicInfoSectionProps) => {
  const items = [
    {
      label: "종류",
      value: (
        <ItemNameWithImage
          name={content.contentCategory.name}
          src={content.contentCategory.imageUrl}
        />
      ),
    },
    { label: "레벨", value: content.level },
    { label: "이름", value: content.displayName },
  ];

  return (
    <Section title="기본 정보">
      <DataGrid items={items} />
    </Section>
  );
};

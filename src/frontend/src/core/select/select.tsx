import { createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/chakra-components/ui/select";

type SelectProps = {
  items: { label: string; value: string }[];
  maxWidth?: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string[];
};

export const Select = ({
  items,
  maxWidth = "10rem",
  onChange,
  placeholder,
  value,
}: SelectProps) => {
  const frameworks = createListCollection({
    items,
  });

  return (
    <SelectRoot
      collection={frameworks}
      maxWidth={maxWidth}
      onValueChange={({ value }) => onChange(value[0])}
      size="xs"
      value={value}
    >
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

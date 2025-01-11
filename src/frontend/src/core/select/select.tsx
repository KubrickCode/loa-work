import { createListCollection, SelectRootProps } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/chakra-components/ui/select";

export type BaseSelectProps<T extends string | number> = Omit<
  SelectRootProps,
  "collection" | "onChange"
> & {
  items: { label: string; value: T | null }[];
  maxWidth?: string;
  onChange: (value: string[]) => void;
  placeholder: string;
  value: string[];
};

export const BaseSelect = <T extends string | number>({
  items,
  maxWidth = "10rem",
  onChange,
  placeholder,
  value,
  ...props
}: BaseSelectProps<T>) => {
  const frameworks = createListCollection({
    items: items.map((item) => ({
      ...item,
      value: item.value?.toString() ?? "",
    })),
  });

  return (
    <SelectRoot
      collection={frameworks}
      maxWidth={maxWidth}
      onValueChange={({ value }) => onChange(value)}
      size="xs"
      value={value}
      {...props}
    >
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent zIndex="calc(var(--chakra-z-index-popover) + 100)">
        {items.map((item) => (
          <SelectItem
            item={{ ...item, value: item.value?.toString() ?? "" }}
            key={item.value ?? "null"}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export type SelectProps<T extends string | number> = Omit<
  BaseSelectProps<T>,
  "onChange" | "value"
> & {
  onChange: (value: T | null) => void;
  value: T | null;
};

export const Select = <T extends string | number>({
  onChange,
  value,
  ...props
}: SelectProps<T>) => {
  return (
    <BaseSelect<T>
      onChange={(values) => {
        if (!values[0]) {
          onChange(null);
          return;
        }
        const parsed = isNaN(Number(values[0])) ? values[0] : Number(values[0]);
        onChange(parsed as T);
      }}
      value={value ? [value.toString()] : [""]}
      {...props}
    />
  );
};

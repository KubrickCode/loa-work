import { createListCollection, SelectRootProps } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/chakra-components/ui/select";

export type BaseSelectProps = Omit<
  SelectRootProps,
  "collection" | "onChange"
> & {
  items: { label: string; value: string }[];
  maxWidth?: string;
  onChange: (value: string[]) => void;
  placeholder: string;
  value: string[];
};

export const BaseSelect = ({
  items,
  maxWidth = "10rem",
  onChange,
  placeholder,
  value,
  ...props
}: BaseSelectProps) => {
  const frameworks = createListCollection({
    items,
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
      {/* SelectContent의 zIndex가 기본적으로 팝오버보다 낮기 때문에 팝오버 내에서 사용할 시 충돌이 발생할 수 있음 */}
      <SelectContent zIndex="calc(var(--chakra-z-index-popover) + 100)">
        {items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export type SelectProps = Omit<BaseSelectProps, "onChange" | "value"> & {
  onChange: (value: string) => void;
  value: string[];
};

export const Select = ({ onChange, value, ...props }: SelectProps) => {
  return (
    <BaseSelect
      onChange={(values) => onChange(values[0])}
      value={value}
      {...props}
    />
  );
};

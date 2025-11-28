import { Controller } from "react-hook-form";

import { Select as BaseSelect, SelectProps as BaseSelectProps } from "~/components/select";

export type SelectProps<T extends string | number> = Omit<
  BaseSelectProps<T>,
  "onChange" | "value"
> & {
  items: { label: string; value: T }[];
  name: string;
};

export const Select = <T extends string | number>({
  items,
  name,
  placeholder,
  ...props
}: SelectProps<T>) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <BaseSelect
            items={items}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            {...props}
          />
        );
      }}
    />
  );
};

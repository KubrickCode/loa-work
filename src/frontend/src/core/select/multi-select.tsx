import { Dispatch, SetStateAction } from "react";

import { BaseSelect, BaseSelectProps } from "./select";

type MultiSelectProps<T extends string | number> = Omit<
  BaseSelectProps<T>,
  "collection" | "multiple" | "onValueChange" | "onChange" | "value"
> & {
  onChange: Dispatch<SetStateAction<T[]>> | ((values: T[]) => void);
  value: T[];
};

export const MultiSelect = <T extends string | number>({
  onChange,
  value,
  ...props
}: MultiSelectProps<T>) => {
  const handleChange = (selectedValues: string[]) => {
    const parsedValues = selectedValues.map((v) => {
      const parsed = isNaN(Number(v)) ? v : Number(v);
      return parsed as T;
    });
    onChange(parsedValues);
  };

  return (
    <BaseSelect<T>
      {...props}
      closeOnSelect={false}
      multiple
      onChange={handleChange}
      value={value.map((v) => v.toString())}
    />
  );
};

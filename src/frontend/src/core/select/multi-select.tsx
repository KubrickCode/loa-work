import { BaseSelect, BaseSelectProps } from "./select";

type MultiSelectProps = Omit<
  BaseSelectProps,
  "collection" | "multiple" | "onValueChange"
> & {
  onChange: (values: string[]) => void;
  value: string[];
};

export const MultiSelect = ({
  onChange,
  value,
  ...props
}: MultiSelectProps) => {
  return (
    <BaseSelect
      {...props}
      closeOnSelect={false}
      multiple
      onChange={onChange}
      value={value}
    />
  );
};

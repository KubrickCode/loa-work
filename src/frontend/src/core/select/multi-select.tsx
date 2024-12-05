import { BaseSelect, BaseSelectProps } from "./select";

type MultiSelectProps = Omit<
  BaseSelectProps,
  "collection" | "multiple" | "onValueChange"
> & {
  onChange: (values: string[]) => void;
};

export const MultiSelect = ({ onChange, ...props }: MultiSelectProps) => {
  return (
    <BaseSelect {...props} closeOnSelect={false} multiple onChange={onChange} />
  );
};

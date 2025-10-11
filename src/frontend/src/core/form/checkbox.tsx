import { Controller } from "react-hook-form";

import { Checkbox as ChakraCheckbox, CheckboxProps } from "~/core/chakra-components/ui/checkbox";

import { useFieldContext } from "./field";

export const Checkbox = (props: CheckboxProps) => {
  const { name } = useFieldContext();

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => (
        <ChakraCheckbox checked={value} onChange={onChange} {...props} />
      )}
    />
  );
};

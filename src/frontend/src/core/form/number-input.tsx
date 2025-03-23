import { Controller } from "react-hook-form";

import { useFieldContext } from "./field";
import {
  NumberInputField,
  NumberInputProps,
  NumberInputRoot,
} from "../chakra-components/ui/number-input";

export const NumberInput = ({ ...otherProps }: NumberInputProps) => {
  const { name } = useFieldContext();

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <NumberInputRoot
            onValueChange={({ value }) => {
              onChange(Number(value));
            }}
            value={value}
            width="full"
            {...otherProps}
          >
            <NumberInputField inputMode="numeric" />
          </NumberInputRoot>
        );
      }}
    />
  );
};

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
            onValueChange={({ value: newValue }) => {
              const numberValue = Number(newValue);
              if (!isNaN(numberValue)) {
                onChange(numberValue);
              }
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

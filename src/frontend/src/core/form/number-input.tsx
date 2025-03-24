import { Controller } from "react-hook-form";

import { useFieldContext } from "./field";
import { INT32_MAX, INT32_MIN } from "./zod";
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
            max={INT32_MAX}
            min={INT32_MIN}
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

import { Controller } from "react-hook-form";

import {
  NumberInputField,
  NumberInputProps,
  NumberInputRoot,
} from "~/components/chakra/ui/number-input";

import { useFieldContext } from "./field";
import { INT32_MAX, INT32_MIN } from "./zod";

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
              if (newValue === "-") {
                onChange("-");
                return;
              }

              if (newValue === "") {
                onChange("");
                return;
              }

              if (isNaN(numberValue)) {
                onChange("");
                return;
              }

              onChange(numberValue);
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

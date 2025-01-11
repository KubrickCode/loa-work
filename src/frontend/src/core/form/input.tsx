import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Flex,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import { Controller } from "react-hook-form";

import { useFieldContext } from "./field";

type OnAfterChangeType<T> = T extends HTMLInputTypeAttribute
  ? T extends "number"
    ? number | null
    : T extends "file"
      ? File[]
      : string
  : never;

export type InputProps<T> = Omit<ChakraInputProps, "onChange" | "type"> & {
  autoFocus?: boolean;
  helpText?: string;
  onAfterChange?: (value: OnAfterChangeType<T>) => void;
  rightAddOn?: string;
  type?: T | HTMLInputTypeAttribute;
};

export const Input = <T extends HTMLInputTypeAttribute = "text">({
  onAfterChange,
  type,
  ...otherProps
}: InputProps<T>) => {
  const { name } = useFieldContext();

  return (
    <Controller
      name={name as any}
      render={({ field: { onBlur, onChange, ref, value } }) => {
        return (
          <Flex direction="column" width="full">
            <ChakraInput
              onBlur={onBlur}
              onChange={(event) => {
                const value =
                  type === "number"
                    ? isNaN(parseFloat(event.target.value))
                      ? null
                      : parseFloat(event.target.value)
                    : type === "file"
                      ? Array.from(event.target.files ?? [])
                      : event.target.value;

                onChange(value);
                if (onAfterChange) {
                  onAfterChange(value as OnAfterChangeType<T>);
                }
              }}
              ref={ref}
              type={type}
              value={value ?? ""}
              {...otherProps}
            />
          </Flex>
        );
      }}
    />
  );
};

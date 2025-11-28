import { Field as ChakraField } from "@chakra-ui/react";
import * as React from "react";

export type FieldProps = {
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  optionalText?: React.ReactNode;
} & Omit<ChakraField.RootProps, "label">;

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(props, ref) {
  const { children, errorText, helperText, label, optionalText, ...rest } = props;
  return (
    <ChakraField.Root ref={ref} {...rest}>
      {label && (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      {children}
      {helperText && <ChakraField.HelperText>{helperText}</ChakraField.HelperText>}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});

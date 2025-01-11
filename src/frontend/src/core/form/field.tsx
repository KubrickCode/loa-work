import { createContext, useContext } from "react";
import { useFormContext, get } from "react-hook-form";

import {
  Field as ChakraField,
  FieldProps as ChakraFieldProps,
} from "~/chakra-components/ui/field";

export type FieldContextType = {
  name: string;
};

export const FieldContext = createContext<FieldContextType | null>(null);

export type FieldProps = ChakraFieldProps & {
  name: string;
};

export const Field = ({ name, ...otherProps }: FieldProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <FieldContext.Provider value={{ name }}>
      <ChakraField
        invalid={!!error}
        errorText={error?.message}
        {...otherProps}
      />
    </FieldContext.Provider>
  );
};

export const useFieldContext = () => {
  const context = useContext(FieldContext);

  if (!context) throw new Error("FieldContext not found");

  return context;
};

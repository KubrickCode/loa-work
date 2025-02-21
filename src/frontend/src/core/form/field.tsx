import { Badge } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import { useFormContext, get } from "react-hook-form";

import {
  Field as ChakraField,
  FieldProps as ChakraFieldProps,
} from "~/core/chakra-components/ui/field";

export type FieldContextType = {
  name: string;
};

export const FieldContext = createContext<FieldContextType | null>(null);

export type FieldProps = ChakraFieldProps & {
  name: string;
  optional?: boolean;
};

export const Field = ({
  name,
  optional = false,
  ...otherProps
}: FieldProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <FieldContext.Provider value={{ name }}>
      <ChakraField
        errorText={error?.message}
        invalid={!!error}
        optionalText={
          optional && (
            <Badge size="xs" variant="surface">
              Optional
            </Badge>
          )
        }
        required={!optional}
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

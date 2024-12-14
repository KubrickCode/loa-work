import { Flex, FlexProps } from "@chakra-ui/react";
import * as RHF from "react-hook-form";

export type FormProps<FormValues extends RHF.FieldValues = RHF.FieldValues> =
  FlexProps & {
    onSubmit: ReturnType<RHF.UseFormReturn<FormValues>["handleSubmit"]>;
  };

export const Form = <FormValues extends RHF.FieldValues>({
  onSubmit,
  ...otherProps
}: FormProps<FormValues>) => (
  <Flex as="form" direction="column" onSubmit={onSubmit} {...otherProps} />
);

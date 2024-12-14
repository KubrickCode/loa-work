import { ReactNode } from "react";
import {
  Control,
  FieldValues,
  FormProvider,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Form, FormProps } from "./form";
import { UseMutationFormOptions, useMutationForm } from "./use-mutation-form";

export type MutationFormProps<
  FormValues extends FieldValues = FieldValues,
  MutationResult = any,
> = Omit<FormProps, "children" | "onSubmit"> &
  Pick<
    UseMutationFormOptions<FormValues, MutationResult>,
    "defaultValues" | "mutation" | "onComplete" | "schema"
  > & {
    children:
      | ReactNode
      | ((form: {
          control: Control<FormValues>;
          formState: FormState<FormValues>;
          register: UseFormRegister<FormValues>;
          setValue: UseFormSetValue<FormValues>;
          submit: (e?: React.BaseSyntheticEvent) => Promise<void>;
          watch: UseFormWatch<FormValues>;
        }) => JSX.Element);
    preventEnterSubmit?: boolean;
  };

export const MutationForm = <
  FormValues extends FieldValues = FieldValues,
  MutationResult = any,
>({
  children,
  defaultValues,
  mutation,
  onComplete,
  preventEnterSubmit,
  schema,
  ...otherProps
}: MutationFormProps<FormValues, MutationResult>) => {
  const { onSubmit, ...useFormReturn } = useMutationForm<
    FormValues,
    MutationResult
  >({
    defaultValues,
    mutation,
    onComplete,
    schema,
  });

  return (
    <FormProvider {...useFormReturn}>
      <Form
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;

          if (e.metaKey || e.ctrlKey) onSubmit();

          if (preventEnterSubmit) e.preventDefault();
        }}
        onSubmit={onSubmit}
        {...otherProps}
      >
        {typeof children === "function"
          ? children({ ...useFormReturn, submit: onSubmit })
          : children}
      </Form>
    </FormProvider>
  );
};

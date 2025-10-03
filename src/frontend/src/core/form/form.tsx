import * as RHF from "react-hook-form";

import { Checkbox } from "./checkbox";
import { Field } from "./field";
import { FormBody } from "./form-body";
import { FormFooter } from "./form-footer";
import { Input } from "./input";
import { MutationForm } from "./mutation-form";
import { NumberInput } from "./number-input";
import { SearchInput } from "./search-input";
import { Select } from "./select";
import { SubmitButton } from "./submit-button";

export type FormProps<FormValues extends RHF.FieldValues = RHF.FieldValues> =
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > & {
    onSubmit: ReturnType<RHF.UseFormReturn<FormValues>["handleSubmit"]>;
  };

const Form = <FormValues extends RHF.FieldValues>({
  onSubmit,
  ...otherProps
}: FormProps<FormValues>) => <form onSubmit={onSubmit} {...otherProps} />;

Form.Checkbox = Checkbox;
Form.Field = Field;
Form.Body = FormBody;
Form.Footer = FormFooter;
Form.Input = Input;
Form.Mutation = MutationForm;
Form.NumberInput = NumberInput;
Form.SearchInput = SearchInput;
Form.Select = Select;
Form.SubmitButton = SubmitButton;

export { Form };

import { FetchResult } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentNode } from "graphql";
import { DefaultValues, FieldPath, FieldValues, useForm } from "react-hook-form";
import { ZodSchema } from "zod";

import { useMutation } from "~/core/graphql";

/**
 * Form Error란 Internal Server Error와 같이 특정 필드와 관계 없는 나머지 모든 에러를 말함.
 */
export const FORM_ERROR_FIELD = "_";

export type UseMutationFormOptions<
  FormValues extends FieldValues = FieldValues,
  MutationResponse = any,
> = {
  defaultValues?: DefaultValues<FormValues>;
  mutation: DocumentNode;
  onComplete: (value: FetchResult<MutationResponse>) => void;
  schema?: ZodSchema<FormValues>;
};

export const useMutationForm = <
  FormValues extends FieldValues = FieldValues,
  MutationResponse = any,
>({
  defaultValues,
  mutation,
  onComplete,
  schema,
}: UseMutationFormOptions<FormValues, MutationResponse>) => {
  const [mutate, mutationResult] = useMutation<MutationResponse>(mutation);

  const { handleSubmit, setError, setFocus, setValue, ...otherProps } = useForm<FormValues>({
    defaultValues,
    ...(schema
      ? {
          resolver: async (...props) => {
            // FORM_ERROR_FIELD 에러는 submit이 다시 되기 전까지 폼 정보가 변경되어도 절대 사라지지 않아 다른 에러와 충돌할 수 있는 문제가 있음.
            // 폼 정보가 변경되어도 FORM_ERROR_FIELD를 계속 봐야할 이유가 없기 때문에 폼 재검증 시점에 이를 제거하도록 함.
            const result = await zodResolver(schema)(...props);
            if (result.values) {
              otherProps.clearErrors(FORM_ERROR_FIELD as FieldPath<FormValues>);
            }

            return result;
          },
        }
      : {}),
  });

  const onValid = async (input: unknown) => {
    const { data, errors } = await mutate({
      variables: {
        input,
      },
    });

    if (errors) {
      for (const error of errors) {
        switch (error.extensions?.code) {
          case "BAD_USER_INPUT":
            setError((error.extensions.field || FORM_ERROR_FIELD) as FieldPath<FormValues>, {
              type: "manual",
              message: error.message,
            });
            if (error.extensions.field) {
              setFocus(error.extensions.field as FieldPath<FormValues>);
            }
            break;

          default:
            setError(FORM_ERROR_FIELD as any, {
              type: "manual",
              message: error.message,
            });
            break;
        }
      }
    } else {
      onComplete({ data });
    }
  };

  return {
    handleSubmit,
    mutationResult,
    onSubmit: handleSubmit(onValid, (errors) => console.error(errors)),
    setError,
    setFocus,
    setValue,
    ...otherProps,
  };
};

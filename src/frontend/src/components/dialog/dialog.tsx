import { NoInfer, TypedDocumentNode } from "@apollo/client";
import { DialogRootProps, Portal } from "@chakra-ui/react";
import { ReactNode, useEffect, useMemo } from "react";
import { FieldValues, FormProvider } from "react-hook-form";

import { DialogBackdrop, DialogRoot } from "~/components/chakra/ui/dialog";
import { Form, useMutationForm, UseMutationFormOptions } from "~/components/form";
import { BlockLoader } from "~/components/loader";
import { useQuery } from "~/libs/graphql";

import { DialogBody } from "./dialog-body";
import { DialogCloseButton } from "./dialog-close-button";
import { DialogContent } from "./dialog-content";
import { DialogFooter } from "./dialog-footer";
import { DialogHeader } from "./dialog-header";
import { DialogTrigger } from "./dialog-trigger";

export type DialogProps = {
  onClose: () => void;
  open: boolean;
};

type DialogComponentPropsWithQuery<
  TInput extends FieldValues,
  TMutation,
  TQuery,
  TVariables,
> = DialogProps & {
  children:
    | ReactNode
    | ((
        props: ReturnType<typeof useMutationForm<TInput, TMutation>> & {
          queryData: TQuery;
          refetch: () => void;
        }
      ) => ReactNode);
  defaultValues?: (data: TQuery) => TInput;
  form?: Pick<UseMutationFormOptions<TInput, TMutation>, "mutation" | "onComplete" | "schema">;
  query: TypedDocumentNode<TQuery, TVariables>;
  queryVariables?: NoInfer<TVariables>;
  size?: DialogRootProps["size"];
};

type DialogComponentPropsWithoutQuery<TInput extends FieldValues, TMutation> = DialogProps & {
  children:
    | ReactNode
    | ((
        props: ReturnType<typeof useMutationForm<TInput, TMutation>> & {
          queryData: never;
        }
      ) => ReactNode);
  defaultValues?: never;
  form?: Pick<UseMutationFormOptions<TInput, TMutation>, "mutation" | "onComplete" | "schema">;
  query?: never;
  queryVariables?: never;
  size?: DialogRootProps["size"];
};

type DialogComponentPropsQueryOnly<TQuery, TVariables> = DialogProps & {
  children: ReactNode | ((props: { queryData: TQuery; refetch: () => void }) => ReactNode);
  defaultValues?: never;
  form?: never;
  query: TypedDocumentNode<TQuery, TVariables>;
  queryVariables?: NoInfer<TVariables>;
  size?: DialogRootProps["size"];
};

type DialogImplementationProps =
  | DialogComponentPropsQueryOnly<any, any>
  | DialogComponentPropsWithQuery<FieldValues, any, any, any>
  | DialogComponentPropsWithoutQuery<FieldValues, any>;

function Dialog<TQuery, TVariables = {}>(
  props: DialogComponentPropsQueryOnly<TQuery, TVariables>
): JSX.Element;
function Dialog<TInput extends FieldValues, TMutation, TQuery, TVariables = {}>(
  props: DialogComponentPropsWithQuery<TInput, TMutation, TQuery, TVariables>
): JSX.Element;
function Dialog<TInput extends FieldValues, TMutation>(
  props: DialogComponentPropsWithoutQuery<TInput, TMutation>
): JSX.Element;
function Dialog(props: DialogImplementationProps): JSX.Element {
  const {
    children,
    defaultValues,
    form,
    onClose,
    open,
    query,
    queryVariables,
    size = "md",
  } = props;
  // Note: query and form props are determined by the component's overload signature
  // and do not change during the component's lifetime, making conditional Hook calls safe here.

  const queryResult = query
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuery(query, {
        skip: !open,
        variables: queryVariables,
      })
    : null;

  const formReturn = form
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useMutationForm({
        defaultValues: undefined,
        mutation: form.mutation,
        onComplete: form.onComplete,
        schema: form.schema,
      })
    : null;

  useEffect(() => {
    if (formReturn && defaultValues && queryResult?.data && !queryResult.loading) {
      formReturn.reset(defaultValues(queryResult.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryResult?.data, queryResult?.loading]);

  const isLoading = queryResult?.loading || false;
  const error = queryResult?.error;
  const queryData = queryResult?.data;

  const renderedChildren = useMemo(() => {
    if (isLoading) {
      return <BlockLoader />;
    }

    if (error) {
      return (
        <>
          <DialogHeader>에러</DialogHeader>
          <DialogBody>에러가 발생했습니다: {error.message}</DialogBody>
        </>
      );
    }

    if (query && !queryData) {
      return (
        <>
          <DialogHeader>에러</DialogHeader>
          <DialogBody>불러온 데이터가 없습니다.</DialogBody>
        </>
      );
    }

    if (typeof children === "function") {
      return children({
        ...(formReturn ?? {}),
        queryData: queryData ?? {},
        refetch: queryResult?.refetch ?? (() => {}),
      } as any);
    }
    return children;
  }, [children, error, formReturn, isLoading, query, queryData, queryResult]);

  const content = useMemo(() => {
    if (formReturn) {
      const { onSubmit } = formReturn;
      return (
        <Form
          onSubmit={(e) => {
            if (e) e.stopPropagation();
            return onSubmit(e);
          }}
        >
          <DialogContent>{renderedChildren}</DialogContent>
        </Form>
      );
    }

    return <DialogContent>{renderedChildren}</DialogContent>;
  }, [formReturn, renderedChildren]);

  return (
    <DialogRoot
      lazyMount
      modal
      onOpenChange={onClose}
      open={open}
      scrollBehavior="inside"
      size={size}
    >
      <Portal>
        <DialogBackdrop />
        {formReturn ? <FormProvider {...formReturn}>{content}</FormProvider> : content}
      </Portal>
    </DialogRoot>
  );
}

Dialog.Body = DialogBody;
Dialog.CloseButton = DialogCloseButton;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
Dialog.Header = DialogHeader;
Dialog.Trigger = DialogTrigger;

export { Dialog };

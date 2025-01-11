import { useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";

import { toaster } from "~/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogFormFooter,
  DialogHeader,
} from "~/core/dialog";
import { Field, Fields, Input, MutationForm, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentDurationEditDialogDocument,
  UserContentDurationEditDocument,
  UserContentDurationEditInput,
  UserContentDurationEditMutation,
} from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

type UserContentDurationEditDialogProps = {
  contentDurationId: number;
  onComplete: () => void;
};

export const UserContentDurationEditDialog = ({
  contentDurationId,
  onComplete,
}: UserContentDurationEditDialogProps) => {
  return (
    <Dialog>
      <DialogHeader>소요시간 수정</DialogHeader>
      <Suspense fallback={<Loader.Block />}>
        <Body contentDurationId={contentDurationId} onComplete={onComplete} />
      </Suspense>
    </Dialog>
  );
};

const schema = z.object({
  id: z.number(),
  value: z.number(),
});

const Body = ({
  contentDurationId,
  onComplete,
}: UserContentDurationEditDialogProps) => {
  const { setOpen } = useDialogContext();
  const { data } = useSafeQuery(UserContentDurationEditDialogDocument, {
    variables: {
      id: contentDurationId,
    },
  });

  const {
    contentDuration: { userContentDuration },
  } = data;

  return (
    <MutationForm<UserContentDurationEditInput, UserContentDurationEditMutation>
      defaultValues={{
        id: userContentDuration.id,
        value: userContentDuration.value,
      }}
      mutation={UserContentDurationEditDocument}
      onComplete={() => {
        setOpen(false);
        onComplete();
        toaster.create({
          title: "컨텐츠 소요시간이 수정되었습니다.",
          type: "success",
        });
      }}
      schema={schema}
    >
      <DialogBody>
        <Fields>
          <Field label="소요시간(초 단위)" name="value">
            <Input type="number" />
          </Field>
        </Fields>
      </DialogBody>
      <DialogFormFooter />
    </MutationForm>
  );
};

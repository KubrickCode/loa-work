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
import {
  UserContentDurationEditDocument,
  UserContentDurationEditInput,
  UserContentDurationEditMutation,
} from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

type UserContentDurationEditDialogProps = {
  durationId: number;
  onComplete: () => void;
  value: number;
};

export const UserContentDurationEditDialog = ({
  durationId,
  onComplete,
  value,
}: UserContentDurationEditDialogProps) => {
  return (
    <Dialog>
      <DialogHeader>소요시간 수정</DialogHeader>
      <Suspense fallback={<Loader.Block />}>
        <Body durationId={durationId} onComplete={onComplete} value={value} />
      </Suspense>
    </Dialog>
  );
};

const schema = z.object({
  id: z.number(),
  value: z.number(),
});

const Body = ({
  durationId,
  onComplete,
  value,
}: UserContentDurationEditDialogProps) => {
  const { setOpen } = useDialogContext();

  return (
    <MutationForm<UserContentDurationEditInput, UserContentDurationEditMutation>
      defaultValues={{
        id: durationId,
        value,
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

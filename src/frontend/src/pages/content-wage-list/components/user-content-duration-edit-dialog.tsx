import { Flex, Input, useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/chakra-components/ui/button";
import { Field } from "~/chakra-components/ui/field";
import { toaster } from "~/chakra-components/ui/toaster";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "~/core/dialog";
import { useMutation } from "~/core/graphql";
import { UserContentDurationEditDocument } from "~/core/graphql/generated";
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

type FormValues = {
  id: number;
  value: number;
};

const Body = ({
  durationId,
  onComplete,
  value,
}: UserContentDurationEditDialogProps) => {
  const { setOpen } = useDialogContext();

  const [editDuration] = useMutation(UserContentDurationEditDocument, {
    onCompleted: () => {
      setOpen(false);
      onComplete();
      toaster.create({
        title: "컨텐츠 소요시간이 수정되었습니다.",
        type: "success",
      });
    },
  });

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      id: durationId,
      value,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await editDuration({
      variables: {
        input: {
          id: durationId,
          value: values.value,
        },
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <DialogBody>
        <Flex direction="column" gap={4}>
          <Field label="소요시간(초 단위)">
            <Input
              type="number"
              step="1"
              {...register(`value`, {
                valueAsNumber: true,
              })}
            />
          </Field>
        </Flex>
      </DialogBody>
      <DialogFooter>
        <Button type="submit">확인</Button>
      </DialogFooter>
    </form>
  );
};

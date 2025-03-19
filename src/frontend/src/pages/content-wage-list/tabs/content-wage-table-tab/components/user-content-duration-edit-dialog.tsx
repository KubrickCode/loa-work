import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentDurationEditDialogDocument,
  UserContentDurationEditDocument,
  UserContentDurationEditInput,
  UserContentDurationEditMutation,
} from "~/core/graphql/generated";

const schema = z.object({
  id: z.number(),
  minutes: z.number().min(0),
  seconds: z.number().min(0).max(59),
});

type UserContentDurationEditDialogProps = {
  contentDurationId: number;
  onComplete: () => void;
};

export const UserContentDurationEditDialog = ({
  contentDurationId,
  onComplete,
  ...dialogProps
}: DialogProps & UserContentDurationEditDialogProps) => {
  const { data } = useSafeQuery(UserContentDurationEditDialogDocument, {
    variables: {
      id: contentDurationId,
    },
  });

  const {
    contentDuration: { userContentDuration },
  } = data;

  const totalSeconds = userContentDuration.value;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<
        UserContentDurationEditInput,
        UserContentDurationEditMutation
      >
        defaultValues={{
          id: userContentDuration.id,
          minutes: minutes,
          seconds: seconds,
        }}
        mutation={UserContentDurationEditDocument}
        onComplete={() => {
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "컨텐츠 소요시간이 수정되었습니다.",
            type: "success",
          });
        }}
        schema={schema}
      >
        <Dialog.Content>
          <Dialog.Header>소요시간 수정</Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              <Form.Field label="분" name="minutes">
                <Form.Input min={0} type="number" />
              </Form.Field>
              <Form.Field label="초" name="seconds">
                <Form.Input max={59} min={0} type="number" />
              </Form.Field>
            </Form.Body>
          </Dialog.Body>
          <Dialog.Footer>
            <Form.Footer>
              <Dialog.CloseButton />
              <Form.SubmitButton />
            </Form.Footer>
          </Dialog.Footer>
        </Dialog.Content>
      </Form.Mutation>
    </Dialog>
  );
};

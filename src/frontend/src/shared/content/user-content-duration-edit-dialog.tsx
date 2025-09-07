import { Flex } from "@chakra-ui/react";

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
  contentId: z.number(),
  minutes: z.number().int32().min(0),
  seconds: z.number().int32().min(0).max(59),
});

type UserContentDurationEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const UserContentDurationEditDialog = ({
  contentId,
  onComplete,
  ...dialogProps
}: DialogProps & UserContentDurationEditDialogProps) => {
  const { data } = useSafeQuery(UserContentDurationEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  const totalSeconds = data.content.duration;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<
        UserContentDurationEditInput,
        UserContentDurationEditMutation
      >
        defaultValues={{
          contentId: contentId,
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
          <Dialog.Header>
            {data.content.displayName} - 소요시간 수정
          </Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              <Flex gap={4}>
                <Form.Field label="분" name="minutes">
                  <Form.NumberInput min={0} />
                </Form.Field>
                <Form.Field label="초" name="seconds">
                  <Form.NumberInput max={59} min={0} />
                </Form.Field>
              </Flex>
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

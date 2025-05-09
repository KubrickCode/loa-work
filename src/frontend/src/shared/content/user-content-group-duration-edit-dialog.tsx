import { Flex, Text } from "@chakra-ui/react";

import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentDurationsEditDocument,
  UserContentDurationsEditInput,
  UserContentDurationsEditMutation,
  UserContentGroupDurationEditDialogDocument,
} from "~/core/graphql/generated";

const schema = z.object({
  contentDurations: z.array(
    z.object({
      id: z.number(),
      minutes: z.number().int32().min(0),
      seconds: z.number().int32().min(0).max(59),
    })
  ),
});

type UserContentGroupDurationEditDialogProps = {
  contentIds: number[];
  onComplete: () => void;
};

export const UserContentGroupDurationEditDialog = ({
  contentIds,
  onComplete,
  ...dialogProps
}: DialogProps & UserContentGroupDurationEditDialogProps) => {
  const { data } = useSafeQuery(UserContentGroupDurationEditDialogDocument, {
    variables: {
      ids: contentIds,
    },
  });

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<
        UserContentDurationsEditInput,
        UserContentDurationsEditMutation
      >
        defaultValues={{
          contentDurations: data.contents.map(({ contentDuration }) => {
            const totalSeconds = contentDuration.userContentDuration.value;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            return {
              id: contentDuration.userContentDuration.id,
              minutes: minutes,
              seconds: seconds,
            };
          }),
        }}
        mutation={UserContentDurationsEditDocument}
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
            {data.contentGroup.name} - 소요시간 수정
          </Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              <Flex direction="column" gap={4}>
                {data.contents.map(({ gate }, index) => (
                  <Flex direction="column" gap={1}>
                    {data.contents.length > 1 && (
                      <Text fontSize="xs">{gate}관문</Text>
                    )}
                    <Flex gap={4} paddingLeft={1}>
                      <Form.Field
                        label="분"
                        name={`contentDurations.${index}.minutes`}
                      >
                        <Form.NumberInput min={0} />
                      </Form.Field>
                      <Form.Field
                        label="초"
                        name={`contentDurations.${index}.seconds`}
                      >
                        <Form.NumberInput max={59} min={0} />
                      </Form.Field>
                    </Flex>
                  </Flex>
                ))}
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

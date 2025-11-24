import { Flex, Text } from "@chakra-ui/react";

import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import {
  ContentDurationsEditDocument,
  EditContentDurationsInput,
  ContentDurationsEditMutation,
  ContentGroupDurationEditDialogDocument,
  ContentGroupDurationEditDialogQuery,
  ContentGroupDurationEditDialogQueryVariables,
} from "~/core/graphql/generated";

const schema = z.object({
  contentDurations: z.array(
    z.object({
      contentId: z.number(),
      minutes: z.number().int32().min(0),
      seconds: z.number().int32().min(0).max(59),
    })
  ),
});

type ContentGroupDurationEditDialogProps = {
  contentIds: number[];
  onComplete: () => void;
};

export const ContentGroupDurationEditDialog = ({
  contentIds,
  onComplete,
  ...dialogProps
}: ContentGroupDurationEditDialogProps & DialogProps) => {
  return (
    <Dialog<
      EditContentDurationsInput,
      ContentDurationsEditMutation,
      ContentGroupDurationEditDialogQuery,
      ContentGroupDurationEditDialogQueryVariables
    >
      defaultValues={(data) => ({
        contentDurations: data.contents.map(({ duration, id }) => {
          const totalSeconds = duration;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          return {
            contentId: id,
            minutes,
            seconds,
          };
        }),
      })}
      form={{
        mutation: ContentDurationsEditDocument,
        onComplete: () => {
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "컨텐츠 소요시간이 수정되었습니다.",
            type: "success",
          });
        },
        schema,
      }}
      query={ContentGroupDurationEditDialogDocument}
      queryVariables={{ ids: contentIds }}
      {...dialogProps}
    >
      {({ queryData }) => (
        <>
          <Dialog.Header>{queryData.contentGroup.name} - 소요시간 수정</Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              <Flex direction="column" gap={4}>
                {queryData.contents.map(({ gate }, index) => (
                  <Flex direction="column" gap={1} key={index}>
                    {queryData.contents.length > 1 && <Text fontSize="xs">{gate}관문</Text>}
                    <Flex gap={4} paddingLeft={1}>
                      <Form.Field label="분" name={`contentDurations.${index}.minutes`}>
                        <Form.NumberInput min={0} />
                      </Form.Field>
                      <Form.Field label="초" name={`contentDurations.${index}.seconds`}>
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
        </>
      )}
    </Dialog>
  );
};

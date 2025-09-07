import { Link, NativeSelect } from "@chakra-ui/react";

import { InputGroup } from "~/core/chakra-components/ui/input-group";
import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentRewardEditDialogDocument,
  ContentRewardsEditDocument,
  ContentRewardsEditInput,
  ContentRewardsEditMutation,
} from "~/core/graphql/generated";

import { ContentRewardReportDialog } from "./content-reward-report-dialog";

const schema = z.object({
  contentRewards: z.array(
    z.object({
      averageQuantity: z.number(),
      contentId: z.number(),
      isSellable: z.boolean(),
      itemId: z.number(),
    })
  ),
  isReportable: z.boolean(),
});

type ContentRewardEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const ContentRewardEditDialog = ({
  contentId,
  onComplete,
  ...dialogProps
}: ContentRewardEditDialogProps & DialogProps) => {
  const { data } = useSafeQuery(ContentRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<ContentRewardsEditInput, ContentRewardsEditMutation>
        defaultValues={{
          contentRewards: data.content.contentRewards.map((reward) => ({
            contentId,
            itemId: reward.item.id,
            averageQuantity: reward.averageQuantity,
            isSellable: reward.isSellable,
          })),
          isReportable: true,
        }}
        mutation={ContentRewardsEditDocument}
        onComplete={() => {
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "컨텐츠 보상이 수정되었습니다.",
            type: "success",
          });
        }}
        schema={schema}
      >
        {({ setValue, watch }) => (
          <Dialog.Content>
            <Dialog.Header>
              {data.content.displayName} - 보상 수정
            </Dialog.Header>
            <Dialog.Body>
              <Form.Body>
                {data.content.contentRewards.map((reward, index) => (
                  <Form.Field
                    key={reward.id}
                    label={reward.item.name}
                    name={`contentRewards.${index}.averageQuantity`}
                  >
                    <InputGroup
                      endElement={
                        <NativeSelect.Root
                          me="-1"
                          size="xs"
                          variant="plain"
                          width="auto"
                        >
                          <NativeSelect.Field
                            fontSize="sm"
                            onChange={(e) => {
                              setValue(
                                `contentRewards.${index}.isSellable`,
                                e.target.value === "true"
                              );
                            }}
                            value={
                              watch(`contentRewards.${index}.isSellable`)
                                ? "true"
                                : "false"
                            }
                          >
                            <option style={{ color: "black" }} value="true">
                              거래 가능
                            </option>
                            <option style={{ color: "black" }} value="false">
                              귀속
                            </option>
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      }
                      w="full"
                    >
                      <Form.Input
                        css={{
                          "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                            {
                              "-webkit-appearance": "none",
                              margin: 0,
                            },
                          "&[type=number]": {
                            "-moz-appearance": "textfield",
                          },
                        }}
                        type="number"
                      />
                    </InputGroup>
                  </Form.Field>
                ))}
                <Form.Field name="isReportable" optional>
                  <Form.Checkbox>저장 후 데이터 제보</Form.Checkbox>
                </Form.Field>
                <Dialog.Trigger
                  dialog={ContentRewardReportDialog}
                  dialogProps={{
                    contentId,
                  }}
                >
                  <Link variant="underline">저장없이 제보만하기</Link>
                </Dialog.Trigger>
              </Form.Body>
            </Dialog.Body>
            <Dialog.Footer>
              <Form.Footer>
                <Dialog.CloseButton />
                <Form.SubmitButton />
              </Form.Footer>
            </Dialog.Footer>
          </Dialog.Content>
        )}
      </Form.Mutation>
    </Dialog>
  );
};

import { Link, NativeSelect } from "@chakra-ui/react";

import { InputGroup } from "~/core/chakra-components/ui/input-group";
import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentRewardEditDialogDocument,
  UserContentRewardsEditDocument,
  UserContentRewardsEditInput,
  UserContentRewardsEditMutation,
} from "~/core/graphql/generated";

import { ContentRewardReportDialog } from "./content-reward-report-dialog";

const schema = z.object({
  userContentRewards: z.array(
    z.object({
      id: z.number(),
      averageQuantity: z.number(),
      isSellable: z.boolean(),
    })
  ),
  isReportable: z.boolean(),
});

type UserContentRewardEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const UserContentRewardEditDialog = ({
  contentId,
  onComplete,
  ...dialogProps
}: UserContentRewardEditDialogProps & DialogProps) => {
  const { data } = useSafeQuery(UserContentRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<
        UserContentRewardsEditInput,
        UserContentRewardsEditMutation
      >
        defaultValues={{
          userContentRewards: data.content.contentRewards.map((reward) => ({
            id: reward.userContentReward.id,
            averageQuantity: reward.userContentReward.averageQuantity,
            isSellable: reward.isSellable,
          })),
          isReportable: true,
        }}
        mutation={UserContentRewardsEditDocument}
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
                    key={reward.userContentReward.id}
                    label={reward.contentRewardItem.name}
                    name={`userContentRewards.${index}.averageQuantity`}
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
                                `userContentRewards.${index}.isSellable`,
                                e.target.value === "true"
                              );
                            }}
                            value={
                              watch(`userContentRewards.${index}.isSellable`)
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

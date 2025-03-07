import { Link } from "@chakra-ui/react";

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
        <Dialog.Content>
          <Dialog.Header>보상 수정</Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              {data.content.contentRewards.map((reward, index) => (
                <Form.Field
                  key={reward.userContentReward.id}
                  label={reward.contentRewardItem.name}
                  name={`userContentRewards.${index}.averageQuantity`}
                >
                  <Form.Input step="0.01" type="number" />
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
      </Form.Mutation>
    </Dialog>
  );
};

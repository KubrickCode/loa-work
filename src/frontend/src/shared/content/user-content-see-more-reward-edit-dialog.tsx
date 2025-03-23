import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentSeeMoreRewardEditDialogDocument,
  UserContentSeeMoreRewardsEditDocument,
  UserContentSeeMoreRewardsEditInput,
  UserContentSeeMoreRewardsEditMutation,
} from "~/core/graphql/generated";

const schema = z.object({
  userContentSeeMoreRewards: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
    })
  ),
});

type UserContentSeeMoreRewardEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const UserContentSeeMoreRewardEditDialog = ({
  contentId,
  onComplete,
  ...dialogProps
}: UserContentSeeMoreRewardEditDialogProps & DialogProps) => {
  const { data } = useSafeQuery(UserContentSeeMoreRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<
        UserContentSeeMoreRewardsEditInput,
        UserContentSeeMoreRewardsEditMutation
      >
        defaultValues={{
          userContentSeeMoreRewards: data.content.contentSeeMoreRewards.map(
            (reward) => ({
              id: reward.userContentSeeMoreReward.id,
              quantity: reward.userContentSeeMoreReward.quantity,
            })
          ),
        }}
        mutation={UserContentSeeMoreRewardsEditDocument}
        onComplete={() => {
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "더보기 보상이 수정되었습니다.",
            type: "success",
          });
        }}
        schema={schema}
      >
        <Dialog.Content>
          <Dialog.Header>
            {data.content.displayName} - 더보기 보상 수정
          </Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              {data.content.contentSeeMoreRewards.map((reward, index) => (
                <Form.Field
                  key={reward.userContentSeeMoreReward.id}
                  label={reward.contentRewardItem.name}
                  name={`userContentSeeMoreRewards.${index}.quantity`}
                >
                  <Form.NumberInput />
                </Form.Field>
              ))}
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

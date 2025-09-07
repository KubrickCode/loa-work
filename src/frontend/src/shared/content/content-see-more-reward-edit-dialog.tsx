import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentSeeMoreRewardEditDialogDocument,
  ContentSeeMoreRewardsEditDocument,
  ContentSeeMoreRewardsEditInput,
  ContentSeeMoreRewardsEditMutation,
} from "~/core/graphql/generated";

const schema = z.object({
  contentSeeMoreRewards: z.array(
    z.object({
      contentId: z.number(),
      itemId: z.number(),
      quantity: z.number(),
    })
  ),
});

type ContentSeeMoreRewardEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const ContentSeeMoreRewardEditDialog = ({
  contentId,
  onComplete,
  ...dialogProps
}: ContentSeeMoreRewardEditDialogProps & DialogProps) => {
  const { data } = useSafeQuery(ContentSeeMoreRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<
        ContentSeeMoreRewardsEditInput,
        ContentSeeMoreRewardsEditMutation
      >
        defaultValues={{
          contentSeeMoreRewards: data.content.contentSeeMoreRewards.map(
            (reward) => ({
              contentId,
              itemId: reward.item.id,
              quantity: reward.quantity,
            })
          ),
        }}
        mutation={ContentSeeMoreRewardsEditDocument}
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
                  key={reward.id}
                  label={reward.item.name}
                  name={`contentSeeMoreRewards.${index}.quantity`}
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

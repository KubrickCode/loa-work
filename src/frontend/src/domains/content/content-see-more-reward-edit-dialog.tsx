import { toaster } from "~/components/chakra/ui/toaster";
import { Dialog, DialogProps } from "~/components/dialog";
import { Form, z } from "~/components/form";
import {
  ContentSeeMoreRewardEditDialogDocument,
  ContentSeeMoreRewardsEditDocument,
  EditContentSeeMoreRewardsInput,
  ContentSeeMoreRewardsEditMutation,
  ContentSeeMoreRewardEditDialogQuery,
  ContentSeeMoreRewardEditDialogQueryVariables,
} from "~/libs/graphql/generated";

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
  return (
    <Dialog<
      EditContentSeeMoreRewardsInput,
      ContentSeeMoreRewardsEditMutation,
      ContentSeeMoreRewardEditDialogQuery,
      ContentSeeMoreRewardEditDialogQueryVariables
    >
      defaultValues={(data) => ({
        contentSeeMoreRewards: data.content.contentSeeMoreRewards.map((reward) => ({
          contentId,
          itemId: reward.item.id,
          quantity: reward.quantity,
        })),
      })}
      form={{
        mutation: ContentSeeMoreRewardsEditDocument,
        onComplete: () => {
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "더보기 보상이 수정되었습니다.",
            type: "success",
          });
        },
        schema,
      }}
      query={ContentSeeMoreRewardEditDialogDocument}
      queryVariables={{ id: contentId }}
      {...dialogProps}
    >
      {({ queryData }) => (
        <>
          <Dialog.Header>{queryData.content.displayName} - 더보기 보상 수정</Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              {queryData.content.contentSeeMoreRewards.map((reward, index) => (
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
        </>
      )}
    </Dialog>
  );
};

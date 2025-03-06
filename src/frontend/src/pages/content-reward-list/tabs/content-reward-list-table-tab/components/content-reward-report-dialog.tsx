import { toaster } from "~/core/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogProps,
} from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentRewardReportDialogDocument,
  ContentRewardsReportDocument,
  ContentRewardsReportInput,
  ContentRewardsReportMutation,
} from "~/core/graphql/generated";

const schema = z.object({
  contentRewards: z.array(
    z.object({
      id: z.number(),
      averageQuantity: z.number(),
    })
  ),
});

type ContentRewardReportDialogProps = {
  contentId: number;
};

export const ContentRewardReportDialog = ({
  contentId,
  ...dialogProps
}: ContentRewardReportDialogProps & DialogProps) => {
  const { data } = useSafeQuery(ContentRewardReportDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<ContentRewardsReportInput, ContentRewardsReportMutation>
        defaultValues={{
          contentRewards: data.content.contentRewards.map((reward) => ({
            id: reward.id,
            averageQuantity: reward.userContentReward.averageQuantity,
          })),
        }}
        mutation={ContentRewardsReportDocument}
        onComplete={() => {
          dialogProps.onClose();
          toaster.create({
            title: "컨텐츠 보상이 제보되었습니다.",
            type: "success",
          });
        }}
        schema={schema}
      >
        <DialogContent>
          <DialogHeader>보상 제보</DialogHeader>
          <DialogBody>
            <Form.Body>
              {data.content.contentRewards.map((reward, index) => (
                <Form.Field
                  key={reward.id}
                  label={reward.contentRewardItem.name}
                  name={`contentRewards.${index}.averageQuantity`}
                >
                  <Form.Input step="0.01" type="number" />
                </Form.Field>
              ))}
            </Form.Body>
          </DialogBody>
          <DialogFooter>
            <Form.Footer>
              <DialogCloseButton />
              <Form.SubmitButton />
            </Form.Footer>
          </DialogFooter>
        </DialogContent>
      </Form.Mutation>
    </Dialog>
  );
};

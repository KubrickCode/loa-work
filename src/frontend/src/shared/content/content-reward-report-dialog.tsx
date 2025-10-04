import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import {
  ContentRewardReportDialogDocument,
  ContentRewardsReportDocument,
  ContentRewardsReportInput,
  ContentRewardsReportMutation,
  ContentRewardReportDialogQuery,
  ContentRewardReportDialogQueryVariables,
} from "~/core/graphql/generated";

const schema = z.object({
  contentRewards: z.array(
    z.object({
      averageQuantity: z.number(),
      id: z.number(),
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
  return (
    <Dialog<
      ContentRewardsReportInput,
      ContentRewardsReportMutation,
      ContentRewardReportDialogQuery,
      ContentRewardReportDialogQueryVariables
    >
      defaultValues={(data) => ({
        contentRewards: data.content.contentRewards.map((reward) => ({
          averageQuantity: reward.averageQuantity,
          id: reward.id,
        })),
      })}
      form={{
        mutation: ContentRewardsReportDocument,
        onComplete: () => {
          dialogProps.onClose();
          toaster.create({
            title: "컨텐츠 보상이 제보되었습니다.",
            type: "success",
          });
        },
        schema,
      }}
      query={ContentRewardReportDialogDocument}
      queryVariables={{ id: contentId }}
      {...dialogProps}
    >
      {({ queryData }) => (
        <>
          <Dialog.Header>보상 제보</Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              {queryData.content.contentRewards.map((reward, index) => (
                <Form.Field
                  key={reward.id}
                  label={reward.item.name}
                  name={`contentRewards.${index}.averageQuantity`}
                >
                  <Form.Input step="0.01" type="number" />
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

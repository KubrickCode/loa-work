import { useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";

import { toaster } from "~/core/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogFormFooter,
  DialogHeader,
} from "~/core/dialog";
import { Field, Fields, Input, MutationForm, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentRewardReportDialogDocument,
  ContentRewardsReportDocument,
  ContentRewardsReportInput,
  ContentRewardsReportMutation,
} from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

type ContentRewardReportDialogProps = {
  contentId: number;
};

export const ContentRewardReportDialog = ({
  contentId,
}: ContentRewardReportDialogProps) => {
  return (
    <Dialog>
      <DialogHeader>보상 제보</DialogHeader>
      <Suspense fallback={<Loader.Block />}>
        <Body contentId={contentId} />
      </Suspense>
    </Dialog>
  );
};

const schema = z.object({
  contentRewards: z.array(
    z.object({
      id: z.number(),
      averageQuantity: z.number(),
    })
  ),
});

const Body = ({ contentId }: ContentRewardReportDialogProps) => {
  const { setOpen } = useDialogContext();
  const { data } = useSafeQuery(ContentRewardReportDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <MutationForm<ContentRewardsReportInput, ContentRewardsReportMutation>
      defaultValues={{
        contentRewards: data.content.contentRewards.map((reward) => ({
          id: reward.id,
          averageQuantity: reward.userContentReward.averageQuantity,
        })),
      }}
      mutation={ContentRewardsReportDocument}
      onComplete={() => {
        setOpen(false);
        toaster.create({
          title: "컨텐츠 보상이 제보되었습니다.",
          type: "success",
        });
      }}
      schema={schema}
    >
      <DialogBody>
        <Fields>
          {data.content.contentRewards.map((reward, index) => (
            <Field
              key={reward.id}
              label={reward.contentRewardItem.name}
              name={`contentRewards.${index}.averageQuantity`}
            >
              <Input step="0.01" type="number" />
            </Field>
          ))}
        </Fields>
      </DialogBody>
      <DialogFormFooter />
    </MutationForm>
  );
};

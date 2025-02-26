import { Link, useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";

import { toaster } from "~/core/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogFormFooter,
  DialogHeader,
  DialogProps,
  DialogTrigger,
} from "~/core/dialog";
import { Checkbox, Field, Fields, Input, MutationForm, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentRewardEditDialogDocument,
  UserContentRewardsEditDocument,
  UserContentRewardsEditInput,
  UserContentRewardsEditMutation,
} from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

import { ContentRewardReportDialog } from "./content-reward-report-dialog";

type UserContentRewardEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const UserContentRewardEditDialog = ({
  contentId,
  onComplete,
  ...dialogProps
}: UserContentRewardEditDialogProps & DialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <DialogHeader>보상 수정</DialogHeader>
      <Suspense fallback={<Loader.Block />}>
        <Body contentId={contentId} onComplete={onComplete} />
      </Suspense>
    </Dialog>
  );
};

const schema = z.object({
  userContentRewards: z.array(
    z.object({
      id: z.number(),
      averageQuantity: z.number(),
    })
  ),
  isReportable: z.boolean(),
});

const Body = ({ contentId, onComplete }: UserContentRewardEditDialogProps) => {
  const { setOpen } = useDialogContext();
  const { data } = useSafeQuery(UserContentRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <MutationForm<UserContentRewardsEditInput, UserContentRewardsEditMutation>
      defaultValues={{
        userContentRewards: data.content.contentRewards.map((reward) => ({
          id: reward.userContentReward.id,
          averageQuantity: reward.userContentReward.averageQuantity,
        })),
        isReportable: true,
      }}
      mutation={UserContentRewardsEditDocument}
      onComplete={() => {
        setOpen(false);
        onComplete();
        toaster.create({
          title: "컨텐츠 보상이 수정되었습니다.",
          type: "success",
        });
      }}
      schema={schema}
    >
      <DialogBody>
        <Fields>
          {data.content.contentRewards.map((reward, index) => (
            <Field
              key={reward.userContentReward.id}
              label={reward.contentRewardItem.name}
              name={`userContentRewards.${index}.averageQuantity`}
            >
              <Input step="0.01" type="number" />
            </Field>
          ))}
          <Field name="isReportable" optional>
            <Checkbox>저장 후 데이터 제보</Checkbox>
          </Field>
          <DialogTrigger
            dialog={ContentRewardReportDialog}
            dialogProps={{
              contentId,
            }}
          >
            <Link variant="underline">저장없이 제보만하기</Link>
          </DialogTrigger>
        </Fields>
      </DialogBody>
      <DialogFormFooter />
    </MutationForm>
  );
};

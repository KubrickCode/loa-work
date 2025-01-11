import { useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";

import { toaster } from "~/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogFormFooter,
  DialogHeader,
} from "~/core/dialog";
import { Field, Fields, Input, MutationForm, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentRewardEditDialogDocument,
  UserContentRewardsEditDocument,
  UserContentRewardsEditInput,
  UserContentRewardsEditMutation,
} from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

type UserContentRewardEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const UserContentRewardEditDialog = ({
  contentId,
  onComplete,
}: UserContentRewardEditDialogProps) => {
  return (
    <Dialog>
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
              <Input type="number" step="0.01" />
            </Field>
          ))}
        </Fields>
      </DialogBody>
      <DialogFormFooter />
    </MutationForm>
  );
};

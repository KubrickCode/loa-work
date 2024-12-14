import { Flex, Input, useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/chakra-components/ui/button";
import { Field } from "~/chakra-components/ui/field";
import { toaster } from "~/chakra-components/ui/toaster";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "~/core/dialog";
import { useMutation, useSafeQuery } from "~/core/graphql";
import {
  UserContentRewardEditDialogDocument,
  UserContentRewardsEditDocument,
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

type FormValues = {
  rewards: {
    id: number;
    averageQuantity: number;
  }[];
};

const Body = ({ contentId, onComplete }: UserContentRewardEditDialogProps) => {
  const { setOpen } = useDialogContext();
  const { data } = useSafeQuery(UserContentRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  const [editRewards] = useMutation(UserContentRewardsEditDocument, {
    onCompleted: () => {
      setOpen(false);
      onComplete();
      toaster.create({
        title: "컨텐츠 보상이 수정되었습니다.",
        type: "success",
      });
    },
  });

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      rewards: data.content.contentRewards.map((reward) => ({
        id: reward.userContentReward.id,
        averageQuantity: reward.userContentReward.averageQuantity,
      })),
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await editRewards({
      variables: {
        input: {
          userContentRewards: values.rewards,
        },
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <DialogBody>
        <Flex direction="column" gap={4}>
          {data.content.contentRewards.map((reward, index) => (
            <Field
              key={reward.userContentReward.id}
              label={reward.contentRewardItem.name}
            >
              <Input
                type="number"
                step="0.01"
                {...register(`rewards.${index}.averageQuantity`, {
                  valueAsNumber: true,
                })}
              />
            </Field>
          ))}
        </Flex>
      </DialogBody>
      <DialogFooter>
        <Button type="submit">확인</Button>
      </DialogFooter>
    </form>
  );
};

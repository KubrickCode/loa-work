import { Flex, Input, useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/chakra-components/ui/button";
import { Field } from "~/chakra-components/ui/field";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "~/core/dialog";
import { useMutation, useSafeQuery } from "~/core/graphql";
import {
  ContentRewardEditDialogDocument,
  ContentRewardsEditDocument,
} from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

type ContentRewardEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const ContentRewardEditDialog = ({
  contentId,
  onComplete,
}: ContentRewardEditDialogProps) => {
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

const Body = ({ contentId, onComplete }: ContentRewardEditDialogProps) => {
  const { setOpen } = useDialogContext();
  const { data } = useSafeQuery(ContentRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  const [editRewards] = useMutation(ContentRewardsEditDocument, {
    onCompleted: () => {
      setOpen(false);
      onComplete();
    },
  });

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      rewards: data.content.contentRewards.map((reward) => ({
        id: reward.id,
        averageQuantity: reward.averageQuantity,
      })),
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await editRewards({
      variables: {
        input: {
          contentRewards: values.rewards,
        },
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <DialogBody>
        <Flex direction="column" gap={4}>
          {data.content.contentRewards.map((reward, index) => (
            <Field key={reward.id} label={reward.itemName}>
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

import { Link } from "@chakra-ui/react";

import { toaster } from "~/core/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTrigger,
} from "~/core/dialog";
import {
  Checkbox,
  Field,
  FormBody,
  FormFooter,
  Input,
  MutationForm,
  SubmitButton,
  z,
} from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentRewardEditDialogDocument,
  UserContentRewardsEditDocument,
  UserContentRewardsEditInput,
  UserContentRewardsEditMutation,
} from "~/core/graphql/generated";

import { ContentRewardReportDialog } from "./content-reward-report-dialog";

const schema = z.object({
  userContentRewards: z.array(
    z.object({
      id: z.number(),
      averageQuantity: z.number(),
    })
  ),
  isReportable: z.boolean(),
});

type UserContentRewardEditDialogProps = {
  contentId: number;
  onComplete: () => void;
};

export const UserContentRewardEditDialog = ({
  contentId,
  onComplete,
  ...dialogProps
}: UserContentRewardEditDialogProps & DialogProps) => {
  const { data } = useSafeQuery(UserContentRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <Dialog {...dialogProps}>
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
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "컨텐츠 보상이 수정되었습니다.",
            type: "success",
          });
        }}
        schema={schema}
      >
        <DialogContent>
          <DialogHeader>보상 수정</DialogHeader>

          <DialogBody>
            <FormBody>
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
            </FormBody>
          </DialogBody>
          <DialogFooter>
            <FormFooter>
              <DialogCloseButton />
              <SubmitButton />
            </FormFooter>
          </DialogFooter>
        </DialogContent>
      </MutationForm>
    </Dialog>
  );
};

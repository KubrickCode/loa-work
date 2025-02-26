import { toaster } from "~/core/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFormFooter,
  DialogHeader,
  DialogProps,
} from "~/core/dialog";
import { Field, Fields, Input, MutationForm, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserContentRewardItemEditDocument,
  UserContentRewardItemEditInput,
  UserContentRewardItemEditMutation,
  UserExtraItemPriceEditDialogDocument,
} from "~/core/graphql/generated";

const schema = z.object({
  id: z.number(),
  price: z.number(),
});

type UserExtraItemPriceEditDialogProps = {
  contentRewardItemId: number;
  onComplete: () => void;
};

export const UserExtraItemPriceEditDialog = ({
  contentRewardItemId,
  onComplete,
  ...dialogProps
}: UserExtraItemPriceEditDialogProps & DialogProps) => {
  const { data } = useSafeQuery(UserExtraItemPriceEditDialogDocument, {
    variables: {
      id: contentRewardItemId,
    },
  });

  const {
    contentRewardItem: { userContentRewardItem },
  } = data;

  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <DialogHeader>기타 아이템 골드 가치 수정</DialogHeader>
        <MutationForm<
          UserContentRewardItemEditInput,
          UserContentRewardItemEditMutation
        >
          defaultValues={{
            id: userContentRewardItem.id,
            price: userContentRewardItem.price,
          }}
          mutation={UserContentRewardItemEditDocument}
          onComplete={() => {
            dialogProps.onClose();
            onComplete();
            toaster.create({
              title: "기타 아이템의 개당 골드 가치가 수정되었습니다.",
              type: "success",
            });
          }}
          schema={schema}
        >
          <DialogBody>
            <Fields>
              <Field label="개당 골드" name="price">
                <Input type="number" />
              </Field>
            </Fields>
          </DialogBody>
          <DialogFormFooter />
        </MutationForm>
      </DialogContent>
    </Dialog>
  );
};

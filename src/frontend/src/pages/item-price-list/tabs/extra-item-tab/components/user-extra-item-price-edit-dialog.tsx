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
import {
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
        <DialogContent>
          <DialogHeader>기타 아이템 골드 가치 수정</DialogHeader>
          <DialogBody>
            <FormBody>
              <Field label="개당 골드" name="price">
                <Input type="number" />
              </Field>
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

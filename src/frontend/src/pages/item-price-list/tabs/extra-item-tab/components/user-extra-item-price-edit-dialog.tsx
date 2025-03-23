import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
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
      <Form.Mutation<
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
        <Dialog.Content>
          <Dialog.Header>
            {data.contentRewardItem.name} - 골드 가치 수정
          </Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              <Form.Field label="개당 골드" name="price">
                <Form.NumberInput />
              </Form.Field>
            </Form.Body>
          </Dialog.Body>
          <Dialog.Footer>
            <Form.Footer>
              <Dialog.CloseButton />
              <Form.SubmitButton />
            </Form.Footer>
          </Dialog.Footer>
        </Dialog.Content>
      </Form.Mutation>
    </Dialog>
  );
};

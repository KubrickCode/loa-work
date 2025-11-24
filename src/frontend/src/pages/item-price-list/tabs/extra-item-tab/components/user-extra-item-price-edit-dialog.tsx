import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import {
  UserExtraItemPriceEditDialogDocument,
  UserItemPriceEditDocument,
  EditUserItemPriceInput,
  UserItemPriceEditMutation,
  UserExtraItemPriceEditDialogQuery,
  UserExtraItemPriceEditDialogQueryVariables,
} from "~/core/graphql/generated";

const schema = z.object({
  id: z.number(),
  price: z.number(),
});

type UserExtraItemPriceEditDialogProps = {
  itemId: number;
  onComplete: () => void;
};

export const UserExtraItemPriceEditDialog = ({
  itemId,
  onComplete,
  ...dialogProps
}: UserExtraItemPriceEditDialogProps & DialogProps) => {
  return (
    <Dialog<
      EditUserItemPriceInput,
      UserItemPriceEditMutation,
      UserExtraItemPriceEditDialogQuery,
      UserExtraItemPriceEditDialogQueryVariables
    >
      defaultValues={(data) => ({
        id: data.item.userItem.id,
        price: data.item.userItem.price,
      })}
      form={{
        mutation: UserItemPriceEditDocument,
        onComplete: () => {
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "기타 아이템의 개당 골드 가치가 수정되었습니다.",
            type: "success",
          });
        },
        schema,
      }}
      query={UserExtraItemPriceEditDialogDocument}
      queryVariables={{ id: itemId }}
      {...dialogProps}
    >
      {({ queryData }) => (
        <>
          <Dialog.Header>{queryData.item.name} - 골드 가치 수정</Dialog.Header>
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
        </>
      )}
    </Dialog>
  );
};

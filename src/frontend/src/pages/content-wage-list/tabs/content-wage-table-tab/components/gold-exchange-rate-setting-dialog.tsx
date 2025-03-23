import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  UserGoldExchangeRateEditDocument,
  UserGoldExchangeRateEditInput,
  UserGoldExchangeRateEditMutation,
  UserGoldExchangeRateSettingDialogDocument,
} from "~/core/graphql/generated";

const schema = z.object({
  id: z.number(),
  krwAmount: z.number().int32().min(0),
});

export const GoldExchangeRateSettingDialog = ({
  onComplete,
  ...dialogProps
}: {
  onComplete: () => void;
} & DialogProps) => {
  const { data } = useSafeQuery(UserGoldExchangeRateSettingDialogDocument);

  const { userGoldExchangeRate } = data;

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<
        UserGoldExchangeRateEditInput,
        UserGoldExchangeRateEditMutation
      >
        defaultValues={{
          id: userGoldExchangeRate.id,
          krwAmount: userGoldExchangeRate.krwAmount,
        }}
        mutation={UserGoldExchangeRateEditDocument}
        onComplete={() => {
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "골드 환율이 수정되었습니다.",
            type: "success",
          });
        }}
        schema={schema}
      >
        <Dialog.Content>
          <Dialog.Header>골드 환율 설정</Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              <Form.Field
                label={`${userGoldExchangeRate.goldAmount}골드 당 원(KRW)`}
                name="krwAmount"
              >
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

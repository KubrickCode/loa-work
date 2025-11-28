import { toaster } from "~/components/chakra/ui/toaster";
import { Dialog, DialogProps } from "~/components/dialog";
import { Form, z } from "~/components/form";
import {
  GoldExchangeRateEditDocument,
  EditGoldExchangeRateInput,
  GoldExchangeRateEditMutation,
  GoldExchangeRateSettingDialogDocument,
  GoldExchangeRateSettingDialogQuery,
} from "~/libs/graphql/generated";

const schema = z.object({
  krwAmount: z.number().int32().min(0),
});

export const GoldExchangeRateSettingDialog = ({
  onComplete,
  ...dialogProps
}: {
  onComplete: () => void;
} & DialogProps) => {
  return (
    <Dialog<
      EditGoldExchangeRateInput,
      GoldExchangeRateEditMutation,
      GoldExchangeRateSettingDialogQuery
    >
      defaultValues={(data) => ({
        krwAmount: data.goldExchangeRate.krwAmount,
      })}
      form={{
        mutation: GoldExchangeRateEditDocument,
        onComplete: () => {
          dialogProps.onClose();
          onComplete();
          toaster.create({
            title: "골드 환율이 수정되었습니다.",
            type: "success",
          });
        },
        schema,
      }}
      query={GoldExchangeRateSettingDialogDocument}
      {...dialogProps}
    >
      {({ queryData }) => (
        <>
          <Dialog.Header>골드 환율 설정</Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              <Form.Field
                label={`${queryData.goldExchangeRate.goldAmount}골드 당 원(KRW)`}
                name="krwAmount"
              >
                <Form.NumberInput min={0} />
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

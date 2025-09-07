import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  GoldExchangeRateEditDocument,
  GoldExchangeRateEditInput,
  GoldExchangeRateEditMutation,
  GoldExchangeRateSettingDialogDocument,
} from "~/core/graphql/generated";

const schema = z.object({
  krwAmount: z.number().int32().min(0),
});

export const GoldExchangeRateSettingDialog = ({
  onComplete,
  ...dialogProps
}: {
  onComplete: () => void;
} & DialogProps) => {
  const { data } = useSafeQuery(GoldExchangeRateSettingDialogDocument);

  const { goldExchangeRate } = data;

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<GoldExchangeRateEditInput, GoldExchangeRateEditMutation>
        defaultValues={{
          krwAmount: goldExchangeRate.krwAmount,
        }}
        mutation={GoldExchangeRateEditDocument}
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
                label={`${goldExchangeRate.goldAmount}골드 당 원(KRW)`}
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
        </Dialog.Content>
      </Form.Mutation>
    </Dialog>
  );
};

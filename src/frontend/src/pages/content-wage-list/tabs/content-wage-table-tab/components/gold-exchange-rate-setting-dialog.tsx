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
  krwAmount: z.number(),
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
        <DialogContent>
          <DialogHeader>골드 환율 설정</DialogHeader>
          <DialogBody>
            <Form.Body>
              <Form.Field
                label={`${userGoldExchangeRate.goldAmount}골드 당 원(KRW)`}
                name="krwAmount"
              >
                <Form.Input type="number" />
              </Form.Field>
            </Form.Body>
          </DialogBody>
          <DialogFooter>
            <Form.Footer>
              <DialogCloseButton />
              <Form.SubmitButton />
            </Form.Footer>
          </DialogFooter>
        </DialogContent>
      </Form.Mutation>
    </Dialog>
  );
};

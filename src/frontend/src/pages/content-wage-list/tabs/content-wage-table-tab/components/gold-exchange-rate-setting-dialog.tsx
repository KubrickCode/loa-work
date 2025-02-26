import { toaster } from "~/core/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFormFooter,
  DialogHeader,
  DialogProps,
} from "~/core/dialog";
import { Field, FormBody, Input, MutationForm, z } from "~/core/form";
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
      <DialogContent>
        <DialogHeader>골드 환율 설정</DialogHeader>
        <MutationForm<
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
          <DialogBody>
            <FormBody>
              <Field
                label={`${userGoldExchangeRate.goldAmount}골드 당 원(KRW)`}
                name="krwAmount"
              >
                <Input type="number" />
              </Field>
            </FormBody>
          </DialogBody>
          <DialogFormFooter />
        </MutationForm>
      </DialogContent>
    </Dialog>
  );
};

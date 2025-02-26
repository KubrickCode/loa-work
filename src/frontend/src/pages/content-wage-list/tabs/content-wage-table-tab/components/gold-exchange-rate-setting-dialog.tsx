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
        <DialogContent>
          <DialogHeader>골드 환율 설정</DialogHeader>
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

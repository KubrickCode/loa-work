import { useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";

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
  UserGoldExchangeRateEditDocument,
  UserGoldExchangeRateEditInput,
  UserGoldExchangeRateEditMutation,
  UserGoldExchangeRateSettingDialogDocument,
} from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

export const GoldExchangeRateSettingDialog = ({
  onComplete,
  ...dialogProps
}: {
  onComplete: () => void;
} & DialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <DialogHeader>골드 환율 설정</DialogHeader>
        <Suspense fallback={<Loader.Block />}>
          <Body onComplete={onComplete} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

const schema = z.object({
  id: z.number(),
  krwAmount: z.number(),
});

const Body = ({ onComplete }: { onComplete: () => void }) => {
  const { setOpen } = useDialogContext();
  const { data } = useSafeQuery(UserGoldExchangeRateSettingDialogDocument);

  const { userGoldExchangeRate } = data;

  return (
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
        setOpen(false);
        onComplete();
        toaster.create({
          title: "골드 환율이 수정되었습니다.",
          type: "success",
        });
      }}
      schema={schema}
    >
      <DialogBody>
        <Fields>
          <Field
            label={`${userGoldExchangeRate.goldAmount}골드 당 원(KRW)`}
            name="krwAmount"
          >
            <Input type="number" />
          </Field>
        </Fields>
      </DialogBody>
      <DialogFormFooter />
    </MutationForm>
  );
};

import { useDialogContext } from "@chakra-ui/react";
import { Suspense } from "react";
import { toaster } from "~/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogFormFooter,
  DialogHeader,
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
import { useContentWageListTable } from "./content-wage-list-table-context";

export const GoldExchangeRateSettingDialog = () => {
  return (
    <Dialog>
      <DialogHeader>골드 환율 설정</DialogHeader>
      <Suspense fallback={<Loader.Block />}>
        <Body />
      </Suspense>
    </Dialog>
  );
};

const schema = z.object({
  id: z.number(),
  goldAmount: z.number(),
});

const Body = () => {
  const { setOpen } = useDialogContext();
  const { refetchTable } = useContentWageListTable();
  const { data } = useSafeQuery(UserGoldExchangeRateSettingDialogDocument);

  const { userGoldExchangeRate } = data;

  return (
    <MutationForm<
      UserGoldExchangeRateEditInput,
      UserGoldExchangeRateEditMutation
    >
      defaultValues={{
        id: userGoldExchangeRate.id,
        goldAmount: userGoldExchangeRate.goldAmount,
      }}
      mutation={UserGoldExchangeRateEditDocument}
      onComplete={() => {
        setOpen(false);
        refetchTable();
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
            label={`${userGoldExchangeRate.krwAmount}원당 골드`}
            name="goldAmount"
          >
            <Input type="number" />
          </Field>
        </Fields>
      </DialogBody>
      <DialogFormFooter />
    </MutationForm>
  );
};

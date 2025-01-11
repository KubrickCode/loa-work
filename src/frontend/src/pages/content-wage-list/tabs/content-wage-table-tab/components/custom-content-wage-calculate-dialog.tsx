import { Flex, FormatNumber, Text } from "@chakra-ui/react";
import { Suspense, useState } from "react";

import { Alert } from "~/chakra-components/alert";
import { toaster } from "~/chakra-components/ui/toaster";
import {
  Dialog,
  DialogBody,
  DialogFormFooter,
  DialogHeader,
} from "~/core/dialog";
import { Field, Fields, Input, MutationForm, z } from "~/core/form";
import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import {
  CustomContentWageCalculateDialogMutationDocument,
  CustomContentWageCalculateDialogMutationMutation,
  CustomContentWageCalculateDialogQueryDocument,
  CustomContentWageCalculateInput,
  CustomContentWageCalculateResult,
} from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

export const CustomContentWageCalculateDialog = () => {
  return (
    <Dialog>
      <DialogHeader>컨텐츠 시급 계산기</DialogHeader>
      <Suspense fallback={<Loader.Block />}>
        <Body />
      </Suspense>
    </Dialog>
  );
};

const schema = z.object({
  duration: z.number(),
  rewardItems: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
    })
  ),
});

const Body = () => {
  const { data } = useSafeQuery(CustomContentWageCalculateDialogQueryDocument);
  const [result, setResult] = useState<CustomContentWageCalculateResult>();

  return (
    <MutationForm<
      CustomContentWageCalculateInput,
      CustomContentWageCalculateDialogMutationMutation
    >
      defaultValues={{
        duration: 0,
        rewardItems: data.contentRewardItems.map((item) => ({
          id: item.id,
          quantity: 0,
        })),
      }}
      mutation={CustomContentWageCalculateDialogMutationDocument}
      onComplete={({ data }) => {
        toaster.create({
          title: "계산이 완료되었습니다.",
          type: "success",
        });
        if (data?.customContentWageCalculate.ok) {
          setResult(data.customContentWageCalculate);
        }
      }}
      schema={schema}
    >
      <DialogBody>
        <Fields>
          <Flex direction="column" fontSize="xs">
            <Text>가상의 컨텐츠 시급을 계산합니다.</Text>
            <Text>소요시간 및 각 보상의 1수당 수량을 입력하세요.</Text>
          </Flex>

          <Field label="소요시간(초 단위)" name="duration">
            <Input type="number" />
          </Field>
          {data.contentRewardItems.map((item, index) => (
            <Field
              key={item.id}
              label={`${item.name}`}
              name={`rewardItems.${index}.quantity`}
            >
              <Input type="number" />
            </Field>
          ))}
          {result && (
            <Alert startElement={<></>} status="info" title="계산 결과:">
              <Flex direction="column" gap={1} p={1}>
                <Flex gap={1}>
                  <Text>시급(KRW): </Text>
                  <FormatNumber
                    currency="KRW"
                    style="currency"
                    value={result.krwAmountPerHour}
                  />
                </Flex>
                <Flex gap={1}>
                  <Text>시급(골드): </Text>
                  <FormatGold value={result.goldAmountPerHour} />
                </Flex>
                <Flex gap={1}>
                  <Text>1수당 골드: </Text>
                  <FormatGold value={result.goldAmountPerClear} />
                </Flex>
              </Flex>
            </Alert>
          )}
        </Fields>
      </DialogBody>
      <DialogFormFooter />
    </MutationForm>
  );
};

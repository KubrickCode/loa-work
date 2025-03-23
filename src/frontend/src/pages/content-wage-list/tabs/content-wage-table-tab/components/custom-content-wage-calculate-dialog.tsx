import { Flex, FormatNumber, Text } from "@chakra-ui/react";
import { useState } from "react";

import { Alert } from "~/core/chakra-components/alert";
import { toaster } from "~/core/chakra-components/ui/toaster";
import { Dialog, DialogProps } from "~/core/dialog";
import { Form, z } from "~/core/form";
import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import {
  CustomContentWageCalculateDialogMutationDocument,
  CustomContentWageCalculateDialogMutationMutation,
  CustomContentWageCalculateDialogQueryDocument,
  CustomContentWageCalculateInput,
  CustomContentWageCalculateResult,
} from "~/core/graphql/generated";

const schema = z.object({
  minutes: z.number().int().min(0),
  seconds: z.number().int().min(0).max(59),
  rewardItems: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
    })
  ),
});

export const CustomContentWageCalculateDialog = (dialogProps: DialogProps) => {
  const { data } = useSafeQuery(CustomContentWageCalculateDialogQueryDocument);
  const [result, setResult] = useState<CustomContentWageCalculateResult>();

  return (
    <Dialog {...dialogProps}>
      <Form.Mutation<
        CustomContentWageCalculateInput,
        CustomContentWageCalculateDialogMutationMutation
      >
        defaultValues={{
          minutes: 0,
          seconds: 0,
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
        <Dialog.Content>
          <Dialog.Header>컨텐츠 시급 계산기</Dialog.Header>
          <Dialog.Body>
            <Form.Body>
              <Flex direction="column" fontSize="xs">
                <Text>가상의 컨텐츠 시급을 계산합니다.</Text>
                <Text>소요시간 및 각 보상의 1수당 수량을 입력하세요.</Text>
              </Flex>

              <Flex direction="column" gap={1}>
                <Text fontSize="xs">소요시간</Text>
                <Flex gap={4}>
                  <Form.Field label="분" name="minutes">
                    <Form.NumberInput min={0} />
                  </Form.Field>
                  <Form.Field label="초" name="seconds">
                    <Form.NumberInput max={59} min={0} />
                  </Form.Field>
                </Flex>
              </Flex>

              {data.contentRewardItems.map((item, index) => (
                <Form.Field
                  key={item.id}
                  label={`${item.name}`}
                  name={`rewardItems.${index}.quantity`}
                >
                  <Form.NumberInput />
                </Form.Field>
              ))}
              {result && (
                <Alert startElement={<></>} status="info" title="계산 결과:">
                  <Flex direction="column" gap={1} p={1}>
                    <Flex gap={1}>
                      <Text>시급(원): </Text>
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
            </Form.Body>
          </Dialog.Body>
          <Dialog.Footer>
            <Form.Footer>
              <Dialog.CloseButton />
              <Form.SubmitButton>계산</Form.SubmitButton>
            </Form.Footer>
          </Dialog.Footer>
        </Dialog.Content>
      </Form.Mutation>
    </Dialog>
  );
};

import { createListCollection, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

import { Button } from "~/core/chakra-components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/core/chakra-components/ui/select";
import { useSafeQuery } from "~/core/graphql";
import { PredictRewardsTabDocument } from "~/core/graphql/generated";
import { Section } from "~/core/section";

type PredictRewardsResult = {
  success: boolean;
  message?: string;
  categoryName?: string;
  targetLevel?: number;
  basedOnLevels?: number[];
  predictions?: Array<{
    itemName: string;
    predictedQuantity: number;
    previousQuantity: number;
    averageIncreaseFactor: number;
    historyLevels: number[];
  }>;
};

export const PredictRewardsTab = () => {
  const { data } = useSafeQuery(PredictRewardsTabDocument);
  const [form, setForm] = useState<{
    categoryId: number;
    level: number;
  }>({
    categoryId: 0,
    level: 0,
  });

  const [result, setResult] = useState<PredictRewardsResult>();

  const frameworks = createListCollection({
    items: data.contentCategories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  });

  return (
    <Section>
      <Flex direction="column" gap={4} w="400px">
        <SelectRoot
          collection={frameworks}
          onValueChange={(e) => setForm({ ...form, categoryId: Number(e.value[0]) })}
          size="xs"
        >
          <SelectLabel>카테고리</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {frameworks.items.map((category) => (
              <SelectItem item={category} key={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Flex direction="column" gap={2}>
          <Text fontSize="sm">레벨</Text>
          <Input
            onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
            placeholder="레벨"
            size="xs"
            value={form.level}
          />
        </Flex>
        <Button
          onClick={async () => {
            const response = await fetch(
              `/api/content/predict-rewards?categoryId=${form.categoryId}&level=${form.level}`,
              { method: "GET" }
            );
            const data = await response.json();
            setResult(data);
          }}
          size="xs"
        >
          예측
        </Button>

        {result && (
          <Flex direction="column" gap={4} mt={4}>
            {!result.success ? (
              <Text color="red.500">{result.message}</Text>
            ) : (
              <>
                <Text fontWeight="bold">
                  {result.categoryName} (목표 레벨: {result.targetLevel})
                </Text>
                <Text fontSize="sm">기반 레벨: {result.basedOnLevels?.join(", ")}</Text>
                {result.predictions?.map((prediction, index) => (
                  <Flex
                    bg="whiteAlpha.200"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    borderRadius="md"
                    direction="column"
                    gap={1}
                    key={index}
                    p={4}
                  >
                    <Text fontWeight="bold">{prediction.itemName}</Text>
                    <Text fontSize="sm">예측 수량: {prediction.predictedQuantity.toFixed(2)}</Text>
                    <Text fontSize="sm">이전 수량: {prediction.previousQuantity}</Text>
                    <Text fontSize="sm">
                      증가율: {((prediction.averageIncreaseFactor - 1) * 100).toFixed(1)}%
                    </Text>
                    <Text fontSize="xs" opacity={0.7}>
                      히스토리 레벨: {prediction.historyLevels.join(", ")}
                    </Text>
                  </Flex>
                ))}
              </>
            )}
          </Flex>
        )}
      </Flex>
    </Section>
  );
};

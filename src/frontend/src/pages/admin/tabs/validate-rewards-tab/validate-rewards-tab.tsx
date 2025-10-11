import { createListCollection, Flex, Text } from "@chakra-ui/react";
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
import { ValidateRewardsTabDocument } from "~/core/graphql/generated";
import { Section } from "~/core/section";

type ValidateRewardsResult = {
  categoryName: string;
  contentId: number;
  level: number;
  message?: string;
  success: boolean;
  validations: Array<{
    currentQuantity: number;
    difference?: string;
    excludedReports?: number;
    itemName: string;
    message?: string;
    reportCount?: number;
    reportedQuantity?: number;
    status: "insufficient_data" | "significant_difference" | "acceptable";
    totalReports?: number;
    validReports?: number;
  }>;
};

export const ValidateRewardsTab = () => {
  const { data } = useSafeQuery(ValidateRewardsTabDocument);
  const [selectedContentId, setSelectedContentId] = useState<number>(0);
  const [result, setResult] = useState<ValidateRewardsResult>();

  const contents = createListCollection({
    items: data.contentList.map((content) => ({
      label: `${content.contentCategory.name} (${content.level})`,
      value: content.id,
    })),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "significant_difference":
        return "red.500";
      case "acceptable":
        return "green.500";
      default:
        return "yellow.500";
    }
  };

  return (
    <Section>
      <Flex direction="column" gap={4} w="400px">
        <SelectRoot
          collection={contents}
          onValueChange={(e) => setSelectedContentId(Number(e.value[0]))}
          size="xs"
        >
          <SelectLabel>컨텐츠</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="컨텐츠 선택" />
          </SelectTrigger>
          <SelectContent>
            {contents.items.map((content) => (
              <SelectItem item={content} key={content.value}>
                {content.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <Button
          onClick={async () => {
            const response = await fetch(
              `/api/content/validate-rewards-by-reports?contentId=${selectedContentId}`,
              { method: "GET" }
            );
            const data = await response.json();
            setResult(data);
          }}
          size="xs"
        >
          검증
        </Button>

        {result && (
          <Flex direction="column" gap={4} mt={4}>
            {!result.success ? (
              <Text color="red.500">{result.message}</Text>
            ) : (
              <>
                <Text fontWeight="bold">
                  {result.categoryName} (레벨: {result.level})
                </Text>
                {result.validations.map((validation, index) => (
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
                    <Text fontWeight="bold">{validation.itemName}</Text>
                    {validation.status === "insufficient_data" ? (
                      <>
                        <Text fontSize="sm">현재 수량: {validation.currentQuantity}</Text>
                        <Text color="yellow.500" fontSize="sm">
                          {validation.message} (제보 수: {validation.reportCount})
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text fontSize="sm">현재 수량: {validation.currentQuantity}</Text>
                        <Text fontSize="sm">
                          제보 평균: {validation.reportedQuantity?.toFixed(2)}
                        </Text>
                        <Text color={getStatusColor(validation.status)} fontSize="sm">
                          차이: {validation.difference}
                        </Text>
                        <Text fontSize="xs" opacity={0.7}>
                          총 제보: {validation.totalReports} (유효: {validation.validReports}, 제외:{" "}
                          {validation.excludedReports})
                        </Text>
                      </>
                    )}
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

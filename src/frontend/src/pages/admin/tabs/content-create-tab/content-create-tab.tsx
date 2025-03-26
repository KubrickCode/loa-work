import { Flex, Text } from "@chakra-ui/react";

import { Checkbox as ChakraCheckbox } from "~/core/chakra-components/ui/checkbox";
import { toaster } from "~/core/chakra-components/ui/toaster";
import { Form, z } from "~/core/form";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentCreateInput,
  ContentCreateTabDataDocument,
  ContentCreateTabDocument,
  ContentCreateTabMutation,
} from "~/core/graphql/generated";
import { Section } from "~/core/section";

const schema = z.object({
  categoryId: z.number(),
  contentRewards: z.array(
    z.object({
      contentRewardItemId: z.number(),
      defaultAverageQuantity: z.number(),
      isSellable: z.boolean(),
      isExcluded: z.boolean(),
    })
  ),
  contentSeeMoreRewards: z
    .array(
      z.object({
        contentRewardItemId: z.number(),
        quantity: z.number(),
        isExcluded: z.boolean(),
      })
    )
    .optional(),
  duration: z.number(),
  gate: z.number().optional(),
  level: z.number(),
  name: z.string(),
});

export const ContentCreateTab = () => {
  const { data } = useSafeQuery(ContentCreateTabDataDocument);

  return (
    <Section>
      <Form.Mutation<ContentCreateInput, ContentCreateTabMutation>
        defaultValues={{
          contentRewards: data.contentRewardItems.map(({ id }) => ({
            contentRewardItemId: id,
            defaultAverageQuantity: 0,
            isSellable: true,
            isExcluded: true,
          })),
          contentSeeMoreRewards: data.contentRewardItems.map(({ id }) => ({
            contentRewardItemId: id,
            quantity: 0,
            isExcluded: true,
          })),
        }}
        mutation={ContentCreateTabDocument}
        onComplete={() => {
          toaster.create({
            title: "컨텐츠가 추가되었습니다.",
            type: "success",
          });
        }}
        schema={schema}
      >
        {({ watch }) => {
          const isRaid = data.contentCategories.some(
            (category) =>
              category.id === watch("categoryId") &&
              (category.name === "에픽 레이드" ||
                category.name === "카제로스 레이드" ||
                category.name === "강습 레이드")
          );

          return (
            <Form.Body w="1200px">
              <Flex gap={4}>
                <Flex
                  border="1px solid"
                  borderColor="gray.800"
                  direction="column"
                  gap={2}
                  p={4}
                  rounded="md"
                  w="full"
                >
                  <Text>컨텐츠 정보</Text>
                  <Form.Field label="카테고리" name="categoryId">
                    <Form.Select
                      items={data.contentCategories.map((category) => ({
                        label: category.name,
                        value: category.id,
                      }))}
                      name="categoryId"
                      placeholder="카테고리 선택"
                    />
                  </Form.Field>
                  <Form.Field label="레벨" name="level">
                    <Form.Input type="number" />
                  </Form.Field>
                  <Form.Field label="이름" name="name">
                    <Form.Input />
                  </Form.Field>
                  <Form.Field label="소요시간(초)" name="duration">
                    <Form.Input type="number" />
                  </Form.Field>
                  {isRaid && (
                    <Form.Field label="관문" name="gate">
                      <Form.Input type="number" />
                    </Form.Field>
                  )}
                </Flex>
                <Flex
                  border="1px solid"
                  borderColor="gray.800"
                  direction="column"
                  gap={2}
                  p={4}
                  rounded="md"
                  w="full"
                >
                  <Text>컨텐츠 보상</Text>
                  {data.contentRewardItems.map((reward, index) => (
                    <Flex
                      border="1px solid"
                      borderColor="gray.700"
                      direction="column"
                      gap={2}
                      key={`content-reward-${reward.id}`}
                      p={2}
                      rounded="md"
                      w="full"
                    >
                      <Form.Field
                        label={reward.name}
                        name={`contentRewards.${index}.defaultAverageQuantity`}
                        optional
                      >
                        <Form.Input
                          disabled={watch(`contentRewards.${index}.isExcluded`)}
                          step="0.01"
                          type="number"
                        />
                      </Form.Field>
                      <Form.Field
                        name={`contentRewards.${index}.isSellable`}
                        optional
                      >
                        <Form.Checkbox size="xs">판매 가능 여부</Form.Checkbox>
                      </Form.Field>
                      <Form.Field
                        name={`contentRewards.${index}.isExcluded`}
                        optional
                      >
                        <Form.Checkbox size="xs">제외 여부</Form.Checkbox>
                      </Form.Field>
                    </Flex>
                  ))}
                </Flex>

                {isRaid && (
                  <Flex
                    border="1px solid"
                    borderColor="gray.800"
                    direction="column"
                    gap={2}
                    p={4}
                    rounded="md"
                    w="full"
                  >
                    <Text>더보기 보상</Text>
                    {data.contentRewardItems.map((reward, index) => (
                      <Flex
                        border="1px solid"
                        borderColor="gray.700"
                        direction="column"
                        gap={2}
                        key={`content-see-more-reward-${reward.id}`}
                        p={2}
                        rounded="md"
                        w="full"
                      >
                        <Form.Field
                          label={reward.name}
                          name={`contentSeeMoreRewards.${index}.quantity`}
                          optional
                        >
                          <Form.Input
                            disabled={watch(
                              `contentSeeMoreRewards.${index}.isExcluded`
                            )}
                            step="0.01"
                            type="number"
                          />
                        </Form.Field>
                        <ChakraCheckbox disabled size="xs">
                          판매 가능 여부
                        </ChakraCheckbox>
                        <Form.Field
                          name={`contentSeeMoreRewards.${index}.isExcluded`}
                          optional
                        >
                          <Form.Checkbox size="xs">제외 여부</Form.Checkbox>
                        </Form.Field>
                      </Flex>
                    ))}
                  </Flex>
                )}
              </Flex>
              <Form.SubmitButton />
            </Form.Body>
          );
        }}
      </Form.Mutation>
    </Section>
  );
};

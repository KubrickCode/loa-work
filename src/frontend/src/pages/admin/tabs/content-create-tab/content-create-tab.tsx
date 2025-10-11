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
      itemId: z.number(),
      averageQuantity: z.number(),
      isBound: z.boolean(),
    })
  ),
  contentSeeMoreRewards: z
    .array(
      z.object({
        itemId: z.number(),
        quantity: z.number(),
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
          contentRewards: data.items.map(({ id }) => ({
            itemId: id,
            averageQuantity: 0,
            isBound: false,
          })),
          contentSeeMoreRewards: data.items.map(({ id }) => ({
            itemId: id,
            quantity: 0,
          })),
        }}
        mutation={ContentCreateTabDocument}
        onComplete={() => {
          toaster.create({
            title: "컨텐츠가 추가되었습니다.",
            type: "success",
          });
          window.location.reload();
        }}
        schema={schema}
      >
        {({ watch }) => {
          // TODO: 레이드 유형인지 판단하여 더보기 보상 생성 여부를 판단하는데, 구조적으로 더 나은 방법 검토 필요.
          const isRaid = data.contentCategories.some(
            (category) =>
              category.id === watch("categoryId") &&
              (category.name === "에픽 레이드" ||
                category.name === "카제로스 레이드" ||
                category.name === "강습 레이드" ||
                category.name === "군단장 레이드")
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
                  {data.items.map((reward, index) => (
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
                        name={`contentRewards.${index}.averageQuantity`}
                        optional
                      >
                        <Form.Input step="0.01" type="number" />
                      </Form.Field>
                      <Form.Field name={`contentRewards.${index}.isBound`} optional>
                        <Form.Checkbox size="xs">귀속 여부</Form.Checkbox>
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
                    {data.items.map((item, index) => (
                      <Flex
                        border="1px solid"
                        borderColor="gray.700"
                        direction="column"
                        gap={2}
                        key={`content-see-more-reward-${item.id}`}
                        p={2}
                        rounded="md"
                        w="full"
                      >
                        <Form.Field
                          label={item.name}
                          name={`contentSeeMoreRewards.${index}.quantity`}
                          optional
                        >
                          <Form.Input step="0.01" type="number" />
                        </Form.Field>
                        <ChakraCheckbox disabled size="xs">
                          귀속 여부
                        </ChakraCheckbox>
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

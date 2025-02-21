import { SimpleGrid, Box, Text, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ResponsiveContainer } from "recharts";

import { useColorModeValue } from "~/core/chakra-components/ui/color-mode";
import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { ContentRewardListPieChartDocument } from "~/core/graphql/generated";
import { useContentRewardListPage } from "~/pages/content-reward-list/content-reward-list-page-context";

export const ContentRewardListPieChart = () => {
  const { contentCategoryId } = useContentRewardListPage();
  const { data } = useSafeQuery(ContentRewardListPieChartDocument, {
    variables: {
      filter: {
        contentCategoryId: Number(contentCategoryId),
      },
    },
  });

  const chartData = useMemo(
    () =>
      data.contentList.map((content) => {
        const rewards = content.contentRewards.map((reward) => ({
          name: reward.contentRewardItem.name,
          value: reward.averageQuantity * reward.contentRewardItem.price,
          rawGold: reward.averageQuantity * reward.contentRewardItem.price,
          color: reward.contentRewardItem.pieColor,
        }));

        rewards.sort((a, b) => b.value - a.value);

        if (rewards.length > 4) {
          const othersValue = rewards
            .slice(4)
            .reduce((sum, item) => sum + item.value, 0);
          const topRewards = rewards.slice(0, 4);
          if (othersValue > 0) {
            topRewards.push({
              name: "기타",
              value: othersValue,
              rawGold: othersValue,
              color: "#808080",
            });
          }
          return {
            contentName: content.displayName,
            rewards: topRewards,
          };
        }

        return {
          contentName: content.displayName,
          rewards,
        };
      }),
    [data.contentList]
  );

  const tooltipBgColor = useColorModeValue("#fff", "#222");
  const tooltipTextColor = useColorModeValue("#1A202C", "#fff");

  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2, xl: 3 }}
      gap={6}
      mx={{ base: 2, md: 0 }}
    >
      {chartData.map((content) => (
        <Box
          border="1px solid"
          borderColor="gray.900"
          borderRadius="md"
          height={400}
          key={content.contentName}
          p={{ base: 4, md: 6 }}
          width="100%"
        >
          <Text fontWeight="bold" mb={4} textAlign="center">
            {content.contentName}
          </Text>
          <Box height="calc(100% - 40px)" px={{ base: 2, md: 6 }}>
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Pie
                  data={content.rewards}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  nameKey="name"
                >
                  {content.rewards.map((_, index) => (
                    <Cell fill={content.rewards[index].color} key={index} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBgColor,
                    color: tooltipTextColor,
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                  formatter={(_, name, props) => [
                    <Flex
                      alignItems="center"
                      color={tooltipTextColor}
                      fontSize="sm"
                      gap={1}
                    >
                      {name} : <FormatGold value={props.payload.rawGold} />
                    </Flex>,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

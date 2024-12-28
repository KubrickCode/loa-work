import { SimpleGrid, Box, Text, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ResponsiveContainer } from "recharts";
import { useColorModeValue } from "~/chakra-components/ui/color-mode";
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

  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
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
          key={content.contentName}
          border="1px solid"
          borderColor="gray.900"
          borderRadius="md"
          p={{ base: 4, md: 6 }}
          height={350}
          width="100%"
        >
          <Text textAlign="center" fontWeight="bold" mb={4}>
            {content.contentName}
          </Text>
          <Box height="calc(100% - 40px)" px={{ base: 2, md: 6 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={content.rewards}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {content.rewards.map((_, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
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

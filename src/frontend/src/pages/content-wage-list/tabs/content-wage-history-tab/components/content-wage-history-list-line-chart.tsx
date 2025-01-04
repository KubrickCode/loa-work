import dayjs from "dayjs";
import { useSafeQuery } from "~/core/graphql";
import { ContentWageHistoryListLineChartDocument } from "~/core/graphql/generated";
import { useContentWageListPage } from "~/pages/content-wage-list/content-wage-list-page-context";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "~/chakra-components/ui/color-mode";

const CHART_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9370DB",
  "#20B2AA",
  "#FFA07A",
  "#87CEEB",
  "#DDA0DD",
  "#F0E68C",
  "#E6E6FA",
  "#98FB98",
  "#DEB887",
];

export const ContentWageHistoryListLineChart = () => {
  const {
    contentCategoryId,
    includeIsSeeMore,
    includeIsBound,
    includeContentRewardItemIds,
  } = useContentWageListPage();

  const dates = useMemo(
    () => ({
      startDate: dayjs().subtract(6, "day").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    }),
    []
  );

  const { data } = useSafeQuery(ContentWageHistoryListLineChartDocument, {
    variables: {
      filter: {
        ...dates,
        contentCategoryId,
        includeIsSeeMore,
        includeIsBound,
        includeContentRewardItemIds,
      },
      orderBy: [
        {
          field: "goldAmount",
          order: "desc",
        },
      ],
    },
  });

  const chartData = useMemo(() => {
    if (!data?.contentWageHistoryList) return [];

    const dateMap = new Map();

    data.contentWageHistoryList.forEach((item) => {
      item.histories.forEach((history) => {
        if (!dateMap.has(history.date)) {
          dateMap.set(history.date, {
            originalDate: history.date,
            date: dayjs(history.date).format("MM/DD"),
            ...data.contentWageHistoryList.reduce(
              (acc, curr) => ({
                ...acc,
                [curr.content.displayName]: 0,
              }),
              {}
            ),
          });
        }
        dateMap.get(history.date)[item.content.displayName] =
          history.goldAmount;
      });
    });

    return Array.from(dateMap.values())
      .sort((a, b) => dayjs(a.originalDate).diff(dayjs(b.originalDate)))
      .map(({ originalDate, ...rest }) => rest);
  }, [data]);

  const tooltipBgColor = useColorModeValue("#fff", "#222");
  const tooltipTextColor = useColorModeValue("#1A202C", "#fff");
  const chartHeight = Math.max(chartData.length * 40, 1000);

  return (
    <Box width="100%" height={chartHeight}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: tooltipTextColor }} />
          <YAxis tick={{ fill: tooltipTextColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBgColor,
              color: tooltipTextColor,
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()}G`,
              name,
            ]}
          />
          <Legend
            wrapperStyle={{
              color: tooltipTextColor,
            }}
          />
          {data.contentWageHistoryList.map((item, index) => (
            <Line
              key={item.content.id}
              type="monotone"
              dataKey={item.content.displayName}
              name={item.content.displayName}
              stroke={CHART_COLORS[index % CHART_COLORS.length]}
              strokeWidth={2}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#fff",
                stroke: CHART_COLORS[index % CHART_COLORS.length],
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: CHART_COLORS[index % CHART_COLORS.length],
              }}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

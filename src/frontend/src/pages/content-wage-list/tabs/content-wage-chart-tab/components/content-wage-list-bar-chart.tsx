import { useBreakpointValue } from "@chakra-ui/react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import { useColorModeValue } from "~/core/chakra-components/ui/color-mode";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentGroupWageListBarChartDocument,
  ContentStatus,
  ContentWageListBarChartDocument,
} from "~/core/graphql/generated";
import { useContentWageListPage } from "~/pages/content-wage-list/content-wage-list-page-context";

export const ContentWageListBarChart = () => {
  const {
    contentCategoryId,
    includeIsBound,
    includeIsSeeMore,
    includeItemIds,
    keyword,
    shouldMergeGate,
  } = useContentWageListPage();

  const { data: wageListData } = useSafeQuery(ContentWageListBarChartDocument, {
    variables: {
      filter: {
        contentCategoryId,
        includeIsBound,
        includeIsSeeMore,
        includeItemIds,
        keyword,
        status: ContentStatus.ACTIVE,
      },
      orderBy: [
        {
          field: "goldAmountPerHour",
          order: "desc",
        },
      ],
    },
  });

  const { data: groupWageListData } = useSafeQuery(ContentGroupWageListBarChartDocument, {
    variables: {
      filter: {
        contentCategoryId,
        includeIsBound,
        includeIsSeeMore,
        includeItemIds,
        keyword,
        status: ContentStatus.ACTIVE,
      },
      orderBy: [
        {
          field: "goldAmountPerHour",
          order: "desc",
        },
      ],
    },
  });

  const chartData = shouldMergeGate
    ? groupWageListData.contentGroupWageList.map((item) => ({
        category: item.contentGroup.contentCategory.name,
        goldAmountPerHour: item.goldAmountPerHour,
        name: item.contentGroup.name,
        시급: item.krwAmountPerHour,
      }))
    : wageListData.contentWageList.map((item) => ({
        category: item.content.contentCategory.name,
        goldAmountPerHour: item.goldAmountPerHour,
        name: item.content.displayName,
        시급: item.krwAmountPerHour,
      }));

  const chartHeight = Math.max(chartData.length * 40, 400);

  const yAxisWidth =
    useBreakpointValue({
      md: 250,
    }) ?? 150;

  const tooltipBgColor = useColorModeValue("#fff", "#222");
  const tooltipTextColor = useColorModeValue("#1A202C", "#fff");

  const categoryColors = useMemo(() => {
    const categories = [...new Set(chartData.map((item) => item.category))];
    const colors = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff8042",
      "#0088fe",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#8884d8",
      "#82ca9d",
    ];

    const colorMap: Record<string, string> = {};
    categories.forEach((category, index) => {
      colorMap[category] = colors[index % colors.length];
    });

    return colorMap;
  }, [chartData]);

  return (
    <ResponsiveContainer height={chartHeight} width="100%">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ bottom: 5, left: 20, right: 30, top: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={{ fill: tooltipTextColor }} type="number" />
        <YAxis
          dataKey="name"
          tick={{ fill: tooltipTextColor }}
          type="category"
          width={yAxisWidth}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBgColor,
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            color: tooltipTextColor,
          }}
          formatter={(value, _, props) => {
            const gold = props.payload.goldAmountPerHour;
            const category = props.payload.category;
            const contentName = props.payload.name;
            return [`${value.toLocaleString()}원 (${gold}G)`, `${category} - ${contentName}`];
          }}
        />
        <Legend
          wrapperStyle={{
            color: tooltipTextColor,
          }}
        />
        <Bar dataKey="시급" fill="#8884d8" name="시급(원/Gold)">
          {chartData.map((entry, index) => (
            <Cell fill={categoryColors[entry.category]} key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

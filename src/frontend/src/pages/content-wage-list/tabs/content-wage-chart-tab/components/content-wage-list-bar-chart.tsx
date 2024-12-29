import { useSafeQuery } from "~/core/graphql";
import { ContentWageListBarChartDocument } from "~/core/graphql/generated";
import { useContentWageListPage } from "~/pages/content-wage-list/content-wage-list-page-context";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useBreakpointValue } from "@chakra-ui/react";
import { useColorModeValue } from "~/chakra-components/ui/color-mode";

export const ContentWageListBarChart = () => {
  const {
    contentCategoryId,
    includeIsSeeMore,
    includeIsBound,
    includeContentRewardItemIds,
  } = useContentWageListPage();

  const { data } = useSafeQuery(ContentWageListBarChartDocument, {
    variables: {
      filter: {
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

  const chartData = data.contentWageList.map((item) => ({
    name: item.content.displayName,
    category: item.content.contentCategory.name,
    시급: item.krwAmount,
    goldAmount: item.goldAmount,
  }));

  const chartHeight = Math.max(chartData.length * 40, 400);

  const yAxisWidth =
    useBreakpointValue({
      md: 250,
    }) ?? 150;

  const tooltipBgColor = useColorModeValue("#fff", "#222");
  const tooltipTextColor = useColorModeValue("#1A202C", "#fff");

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
            color: tooltipTextColor,
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
          formatter={(value, _, props) => {
            const gold = props.payload.goldAmount;
            const category = props.payload.category;
            const contentName = props.payload.name;
            return [
              `${value.toLocaleString()}원 (${gold}G)`,
              `${category} - ${contentName}`,
            ];
          }}
        />
        <Legend
          wrapperStyle={{
            color: tooltipTextColor,
          }}
        />
        <Bar dataKey="시급" fill="#8884d8" name="시급(KRW/Gold)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

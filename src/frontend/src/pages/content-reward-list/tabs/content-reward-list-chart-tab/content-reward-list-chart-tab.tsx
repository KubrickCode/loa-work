import { Flex, Text } from "@chakra-ui/react";
import { Suspense } from "react";

import { ChartSkeleton } from "~/core/loader";
import { Section } from "~/core/section";

import { ContentRewardListPieChart } from "./components/content-reward-list-pie-chart";
import { ContentRewardListPageProvider } from "../../content-reward-list-page-context";
import { ContentRewardListTableFilters } from "../content-reward-list-table-tab/components/content-reward-list-table-filters";

export const ContentRewardListChartTab = () => {
  return (
    <Section
      title={
        <Flex alignItems="center" gap={2}>
          <Text>보상 비율</Text>
          <Text
            color="text.muted"
            display={{ base: "none", md: "block" }}
            fontSize="xs"
          >
            큰 화면에서 보는 것을 권장합니다
          </Text>
        </Flex>
      }
    >
      <ContentRewardListPageProvider>
        <ContentRewardListTableFilters />
        <Suspense fallback={<ChartSkeleton height="400px" />}>
          <ContentRewardListPieChart />
        </Suspense>
      </ContentRewardListPageProvider>
    </Section>
  );
};

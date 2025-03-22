import { Flex, Text } from "@chakra-ui/react";
import { Suspense } from "react";

import { TableSkeleton } from "~/core/loader";
import { Section } from "~/core/section";

import { ContentWageListBarChart } from "./components/content-wage-list-bar-chart";
import { ContentWageListFilters } from "../../components";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";

export const ContentWageChartTab = () => {
  return (
    <Section
      title={
        <Flex alignItems="center" gap={2}>
          <Text>시급 비교</Text>
          <Text fontSize="xs">큰 화면에서 보는 것을 권장합니다</Text>
        </Flex>
      }
    >
      <ContentWageListPageProvider>
        <Flex direction="column" gap={2}>
          <ContentWageListFilters />
          <Suspense fallback={<TableSkeleton line={30} />}>
            <ContentWageListBarChart />
          </Suspense>
        </Flex>
      </ContentWageListPageProvider>
    </Section>
  );
};

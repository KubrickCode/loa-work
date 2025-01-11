import { Flex } from "@chakra-ui/react";

import { Section } from "~/core/section";
import { ItemStatUpdateToggleTip } from "~/shared/item";

import { ContentWageListBarChart } from "./components/content-wage-list-bar-chart";
import { ContentWageListFilters } from "../../components";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";


export const ContentWageChartTab = () => {
  return (
    <Section title="시급 비교">
      <ContentWageListPageProvider>
        <Flex direction="column" gap={2}>
          <Flex alignItems="center" gap={2}>
            <ContentWageListFilters />
            <ItemStatUpdateToggleTip />
          </Flex>
          <ContentWageListBarChart />
        </Flex>
      </ContentWageListPageProvider>
    </Section>
  );
};

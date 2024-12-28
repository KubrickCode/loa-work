import { Section } from "~/core/section";
import { ContentWageListBarChart } from "./components/content-wage-list-bar-chart";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";
import { Flex } from "@chakra-ui/react";
import { ContentWageListFilters } from "../../components";
import { ItemStatUpdateToggleTip } from "~/shared/item";

export const ContentWageChartTab = () => {
  return (
    <Section>
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

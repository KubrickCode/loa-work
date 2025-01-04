import { Section } from "~/core/section";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";
import { Flex } from "@chakra-ui/react";
import { ContentWageListFilters } from "../../components";
import { ItemStatUpdateToggleTip } from "~/shared/item";
import { ContentWageHistoryListLineChart } from "./components/content-wage-history-list-line-chart";

export const ContentWageHistoryTab = () => {
  return (
    <Section title="시급 히스토리">
      <ContentWageListPageProvider>
        <Flex direction="column" gap={2}>
          <Flex alignItems="center" gap={2}>
            <ContentWageListFilters />
            <ItemStatUpdateToggleTip />
          </Flex>
          <ContentWageHistoryListLineChart />
        </Flex>
      </ContentWageListPageProvider>
    </Section>
  );
};

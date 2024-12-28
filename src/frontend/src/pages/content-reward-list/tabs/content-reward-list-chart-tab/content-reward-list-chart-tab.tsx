import { Section } from "~/core/section";
import { ContentRewardListTableFilter } from "../content-reward-list-table-tab/components/content-reward-list-table-filter";
import { ItemStatUpdateToggleTip } from "~/shared/item";
import { Flex } from "@chakra-ui/react";
import { ContentRewardListPieChart } from "./components/content-reward-list-pie-chart";
import { ContentRewardListPageProvider } from "../../content-reward-list-page-context";

export const ContentRewardListChartTab = () => {
  return (
    <Section>
      <ContentRewardListPageProvider>
        <Flex alignItems="center" gap={2}>
          <ContentRewardListTableFilter />
          <ItemStatUpdateToggleTip />
        </Flex>
        <ContentRewardListPieChart />
      </ContentRewardListPageProvider>
    </Section>
  );
};

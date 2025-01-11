import { Flex } from "@chakra-ui/react";

import { Section } from "~/core/section";
import { ItemStatUpdateToggleTip } from "~/shared/item";

import { ContentRewardListPieChart } from "./components/content-reward-list-pie-chart";
import { ContentRewardListPageProvider } from "../../content-reward-list-page-context";
import { ContentRewardListTableFilter } from "../content-reward-list-table-tab/components/content-reward-list-table-filter";

export const ContentRewardListChartTab = () => {
  return (
    <Section title="보상 비율">
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

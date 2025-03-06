import { Suspense } from "react";

import { BlockLoader } from "~/core/loader";
import { Section } from "~/core/section";

import { ContentRewardListPieChart } from "./components/content-reward-list-pie-chart";
import { ContentRewardListPageProvider } from "../../content-reward-list-page-context";
import { ContentRewardListTableFilters } from "../content-reward-list-table-tab/components/content-reward-list-table-filters";

export const ContentRewardListChartTab = () => {
  return (
    <Section title="보상 비율">
      <ContentRewardListPageProvider>
        <ContentRewardListTableFilters />
        <Suspense fallback={<BlockLoader />}>
          <ContentRewardListPieChart />
        </Suspense>
      </ContentRewardListPageProvider>
    </Section>
  );
};

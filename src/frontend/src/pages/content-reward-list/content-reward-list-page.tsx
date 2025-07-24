import { Page } from "~/core/page";
import { Tabs } from "~/core/tabs";

import { ContentRewardListChartTab, ContentRewardListTableTab } from "./tabs";

export const ContentRewardListPage = () => {
  const tabPanels = [
    {
      id: "table",
      label: "표",
      component: <ContentRewardListTableTab />,
    },
    {
      id: "chart",
      label: "차트",
      component: <ContentRewardListChartTab />,
    },
  ];

  return (
    <Page title="컨텐츠별 보상">
      <Tabs panels={tabPanels} />
    </Page>
  );
};

import { Page } from "~/core/page";
import { Tabs } from "~/core/tabs";

import { ContentWageChartTab, ContentWageTableTab } from "./tabs";

export const ContentWageListPage = () => {
  const tabPanels = [
    {
      id: "table",
      label: "표",
      component: <ContentWageTableTab />,
    },
    {
      id: "chart",
      label: "차트",
      component: <ContentWageChartTab />,
    },
  ];

  return (
    <Page title="컨텐츠별 시급">
      <Tabs panels={tabPanels} />
    </Page>
  );
};

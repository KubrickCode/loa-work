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
    <Page>
      <Tabs panels={tabPanels} />
    </Page>
  );
};

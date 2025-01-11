import { Page } from "~/core/page";
import { Tabs } from "~/core/tabs";

import {
  ContentWageChartTab,
  ContentWageHistoryTab,
  ContentWageTableTab,
} from "./tabs";

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
    {
      id: "history",
      label: "히스토리",
      component: <ContentWageHistoryTab />,
    },
  ];

  return (
    <Page>
      <Tabs panels={tabPanels} />
    </Page>
  );
};

import { Page } from "~/core/page";
import { Tabs } from "~/core/tabs";

import { ContentWageChartTab, ContentWageTableTab } from "./tabs";

export const ContentWageListPage = () => {
  const tabPanels = [
    {
      component: <ContentWageTableTab />,
      id: "table",
      label: "표",
    },
    {
      component: <ContentWageChartTab />,
      id: "chart",
      label: "차트",
    },
  ];

  return (
    <Page
      description="로스트아크 각 컨텐츠별 시급을 계산하고 비교하여 유저들이 즐기는 컨텐츠의 현실 재화 가치를 인사이트로 제공합니다. 컨텐츠의 시간당, 클리어당 수익을 한눈에 확인하세요."
      title="컨텐츠별 시급"
    >
      <Tabs panels={tabPanels} />
    </Page>
  );
};

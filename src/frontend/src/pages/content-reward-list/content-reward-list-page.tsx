import { Page } from "~/core/page";
import { Tabs } from "~/core/tabs";

import { ContentRewardListChartTab, ContentRewardListTableTab } from "./tabs";

export const ContentRewardListPage = () => {
  const tabPanels = [
    {
      component: <ContentRewardListTableTab />,
      id: "table",
      label: "표",
    },
    {
      component: <ContentRewardListChartTab />,
      id: "chart",
      label: "차트",
    },
  ];

  return (
    <Page
      description="로스트아크 각 컨텐츠별 보상 정보를 상세히 확인할 수 있습니다. 레이드, 가디언 토벌, 쿠르잔 전선 등의 보상을 표와 차트로 비교 분석하세요."
      title="컨텐츠별 보상"
    >
      <Tabs panels={tabPanels} />
    </Page>
  );
};

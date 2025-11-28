import { Page } from "~/layouts/page";

import { ContentRewardList } from "./content-reward-list";

export const ContentRewardListPage = () => {
  return (
    <Page
      description="로스트아크 각 컨텐츠별 보상 정보를 상세히 확인할 수 있습니다. 레이드, 가디언 토벌, 쿠르잔 전선 등의 보상을 표로 확인하세요."
      title="컨텐츠별 보상"
    >
      <ContentRewardList />
    </Page>
  );
};

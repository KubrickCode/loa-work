import { Page } from "~/layouts/page";

import { ContentWageList } from "./content-wage-list";

export const ContentWageListPage = () => {
  return (
    <Page
      description="로스트아크 각 컨텐츠별 시급을 계산하고 비교하여 유저들이 즐기는 컨텐츠의 현실 재화 가치를 인사이트로 제공합니다. 컨텐츠의 시간당, 클리어당 수익을 한눈에 확인하세요."
      title="컨텐츠별 시급"
    >
      <ContentWageList />
    </Page>
  );
};

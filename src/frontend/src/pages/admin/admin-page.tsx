import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth, UserRole } from "~/core/auth";
import { PageLoader } from "~/core/loader";
import { Page } from "~/core/page";
import { Tabs } from "~/core/tabs";

import { ContentCreateTab } from "./tabs/content-create-tab";
import { PredictRewardsTab } from "./tabs/predict-rewards-tab";
import { UserListTab } from "./tabs/user-list-tab";
import { ValidateRewardsTab } from "./tabs/validate-rewards-tab";

export const AdminPage = () => {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || ![UserRole.OWNER, UserRole.ADMIN].includes(user.role))) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <PageLoader />;

  const tabPanels = [
    {
      component: <PredictRewardsTab />,
      id: "predict-rewards",
      label: "컨텐츠 보상 예측",
    },
    {
      component: <ValidateRewardsTab />,
      id: "validate-rewards",
      label: "컨텐츠 보상 검증",
    },
    {
      component: <ContentCreateTab />,
      id: "content-create",
      label: "컨텐츠 생성",
    },
    {
      component: <UserListTab />,
      id: "user-list",
      label: "유저 관리",
    },
  ];

  return (
    <Page
      description="로스트아크 컨텐츠 데이터 관리를 위한 관리자 전용 페이지입니다."
      title="관리자 페이지"
    >
      <Tabs panels={tabPanels} />
    </Page>
  );
};

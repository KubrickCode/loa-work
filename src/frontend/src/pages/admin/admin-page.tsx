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
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isLoading &&
      (!user || ![UserRole.OWNER, UserRole.ADMIN].includes(user.role))
    ) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <PageLoader />;

  const tabPanels = [
    {
      id: "predict-rewards",
      label: "컨텐츠 보상 예측",
      component: <PredictRewardsTab />,
    },
    {
      id: "validate-rewards",
      label: "컨텐츠 보상 검증",
      component: <ValidateRewardsTab />,
    },
    {
      id: "content-create",
      label: "컨텐츠 생성",
      component: <ContentCreateTab />,
    },
    {
      id: "user-list",
      label: "유저 관리",
      component: <UserListTab />,
    },
  ];

  return (
    <Page>
      <Tabs panels={tabPanels} />
    </Page>
  );
};

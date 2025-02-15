import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth, UserRole } from "~/core/auth";
import { Loader } from "~/core/loader";
import { Page } from "~/core/page";
import { Tabs } from "~/core/tabs";

import { PredictRewardsTab } from "./tabs/predict-rewards-tab";

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

  if (isLoading) return <Loader.Page />;

  const tabPanels = [
    {
      id: "predict-rewards",
      label: "컨텐츠 보상 예측",
      component: <PredictRewardsTab />,
    },
  ];

  return (
    <Page>
      <Tabs panels={tabPanels} />
    </Page>
  );
};

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth, UserRole } from "~/core/auth";
import { Loader } from "~/core/loader";
import { Page } from "~/core/page";

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

  return <Page>어드민 페이지</Page>;
};

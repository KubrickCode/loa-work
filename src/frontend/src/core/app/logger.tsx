import LogRocket from "logrocket";
import { useEffect } from "react";

import { useAuth } from "../auth";

export const Logger = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (import.meta.env.PROD) {
      LogRocket.init(import.meta.env.VITE_LOGROCKET_ID);

      if (user) {
        LogRocket.identify(user.email ?? user.refId, {
          email: user.email ?? "",
          id: user.refId,
          name: user.displayName,
        });
      }
    }
  }, [user]);

  return null;
};

import * as Sentry from "@sentry/react";
import LogRocket from "logrocket";
import { useEffect } from "react";

import { useAuth } from "../auth";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

export const Logger = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    LogRocket.init(import.meta.env.VITE_LOGROCKET_ID);

    if (!user) return;

    LogRocket.identify(user.email ?? user.refId, {
      email: user.email ?? "",
      id: user.refId,
      name: user.displayName,
    });
  }, [user]);

  return null;
};

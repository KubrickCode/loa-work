import { Suspense } from "react";

import { AuthProvider } from "../auth";
import { ErrorBoundary } from "../error";
import { GraphQLProvider } from "../graphql";
import { Layout } from "../layout";
import { ThemeProvider } from "../theme";
import { Router, Routes } from "./router";
import { PageLoader } from "../loader";
import { Logger } from "./logger";

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Logger />
          <GraphQLProvider>
            <Layout>
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes />
                </Suspense>
              </ErrorBoundary>
            </Layout>
          </GraphQLProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

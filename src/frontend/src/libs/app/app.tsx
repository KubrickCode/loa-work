import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

import { ErrorBoundary } from "~/components/error";
import { PageLoader } from "~/components/loader";
import { Layout } from "~/layouts/layout";
import { AuthProvider } from "~/libs/auth";
import { GraphQLProvider } from "~/libs/graphql";
import { ThemeProvider } from "~/libs/theme";

import { Logger } from "./logger";
import { Router, Routes } from "./router";

export const App = () => {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
};

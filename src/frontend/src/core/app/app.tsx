import { Suspense } from "react";
import { GraphQLProvider } from "../graphql";
import { Layout } from "../layout";
import { ThemeProvider } from "../theme";
import { Router, Routes } from "./router";
import { Loader } from "../loader";
import { AuthProvider } from "../auth";
import { ErrorBoundary } from "../error";

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <GraphQLProvider>
            <Layout>
              <ErrorBoundary>
                <Suspense fallback={<Loader.Page />}>
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

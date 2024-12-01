import { Suspense } from "react";
import { GraphQLProvider } from "../graphql";
import { Layout } from "../layout";
import { ThemeProvider } from "../theme";
import { Router, Routes } from "./router";
import { Loader } from "../loader";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "../auth";

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <GraphQLProvider>
            <Layout>
              <ErrorBoundary
                fallbackRender={({ error }) => <>{error.message}</>}
              >
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

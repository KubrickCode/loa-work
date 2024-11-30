import { Suspense } from "react";
import { GraphQLProvider } from "../graphql";
import { Layout } from "../layout";
import { ThemeProvider } from "../theme";
import { Router, Routes } from "./router";
import { Loader } from "../loader";
import { ErrorBoundary } from "react-error-boundary";

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <GraphQLProvider>
          <Layout>
            <ErrorBoundary fallbackRender={({ error }) => <>{error.message}</>}>
              <Suspense fallback={<Loader.Page />}>
                <Routes />
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </GraphQLProvider>
      </Router>
    </ThemeProvider>
  );
};

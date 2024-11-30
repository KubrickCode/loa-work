import { Suspense } from "react";
import { GraphQLProvider } from "../graphql";
import { Layout } from "../layout";
import { ThemeProvider } from "../theme";
import { Router, Routes } from "./router";
import { Loader } from "../loader";

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <GraphQLProvider>
          <Layout>
            <Suspense fallback={<Loader.Page />}>
              <Routes />
            </Suspense>
          </Layout>
        </GraphQLProvider>
      </Router>
    </ThemeProvider>
  );
};

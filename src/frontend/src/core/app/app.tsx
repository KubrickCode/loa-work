import { GraphQLProvider } from "../graphql";
import { Layout } from "../layout";
import { ThemeProvider } from "../theme";
import { Router, Routes } from "./router";

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <GraphQLProvider>
          <Layout>
            <Routes />
          </Layout>
        </GraphQLProvider>
      </Router>
    </ThemeProvider>
  );
};

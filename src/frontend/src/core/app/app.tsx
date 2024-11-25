import { Page } from "~/pages/page";
import { GraphQLProvider } from "../graphql";
import { Router } from "./router";

export const App = () => {
  return (
    <Router>
      <GraphQLProvider>
        <Page />
      </GraphQLProvider>
    </Router>
  );
};

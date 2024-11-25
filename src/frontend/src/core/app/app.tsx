import { GraphQLProvider } from "../graphql";
import { Router, Routes } from "./router";

export const App = () => {
  return (
    <Router>
      <GraphQLProvider>
        <Routes />
      </GraphQLProvider>
    </Router>
  );
};

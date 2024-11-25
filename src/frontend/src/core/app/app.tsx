import { GraphQLProvider } from "../graphql";
import { ThemeProvider } from "../theme";
import { Router, Routes } from "./router";

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <GraphQLProvider>
          <Routes />
        </GraphQLProvider>
      </Router>
    </ThemeProvider>
  );
};

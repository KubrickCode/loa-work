import { Page } from "~/pages/page";
import { GraphQLProvider } from "../graphql";

export const App = () => {
  return (
    <GraphQLProvider>
      <Page />
    </GraphQLProvider>
  );
};

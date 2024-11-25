import * as ReactRouter from "react-router-dom";
import { createElement } from "react";
import _ from "lodash";

import DashboardPage from "~/pages/dashboard";
import ContentRewardListPage from "~/pages/content-reward-list";

const routes = [
  {
    path: "/",
    component: DashboardPage,
  },
  {
    path: "/content-reward-list",
    component: ContentRewardListPage,
  },
] as const;

export const Routes = () => {
  return (
    <ReactRouter.Routes>
      {_.map(routes, ({ path, component }) => (
        <ReactRouter.Route
          key={path}
          path={path}
          element={createElement(component)}
        />
      ))}
    </ReactRouter.Routes>
  );
};

export type RoutePath = (typeof routes)[number]["path"];

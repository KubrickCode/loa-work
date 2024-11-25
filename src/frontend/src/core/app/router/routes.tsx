import * as ReactRouter from "react-router-dom";
import { createElement } from "react";
import _ from "lodash";

import DashboardPage from "~/pages/dashboard";

const routes = [
  {
    path: "/",
    component: DashboardPage,
  },
];

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

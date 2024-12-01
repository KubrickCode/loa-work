import * as ReactRouter from "react-router-dom";
import { createElement } from "react";
import _ from "lodash";

import ContentRewardListPage from "~/pages/content-reward-list";
import ContentWageListPage from "~/pages/content-wage-list";
import ItemPriceListPage from "~/pages/item-price-list";
import LoginPage from "~/pages/login";

const routes = [
  {
    path: "/",
    component: ContentWageListPage,
  },
  {
    path: "/content-reward-list",
    component: ContentRewardListPage,
  },
  {
    path: "/item-price-list",
    component: ItemPriceListPage,
  },
  {
    path: "/login",
    component: LoginPage,
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

import _ from "lodash";
import { createElement } from "react";
import * as ReactRouter from "react-router-dom";

import AdminPage from "~/pages/admin";
import ContentRewardListPage from "~/pages/content-reward-list";
import ContentWageListPage from "~/pages/content-wage-list";
import ItemPriceListPage from "~/pages/item-price-list";
import { NotFoundPage } from "~/pages/not-found-page";
import { PrivacyPolicyPage } from "~/pages/privacy-policy";

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
    path: "/privacy-policy",
    component: PrivacyPolicyPage,
  },
  {
    path: "/admin",
    component: AdminPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
] as const;

export const Routes = () => {
  return (
    <ReactRouter.Routes>
      {_.map(routes, ({ path, component }) => (
        <ReactRouter.Route
          element={createElement(component)}
          key={path}
          path={path}
        />
      ))}
    </ReactRouter.Routes>
  );
};

export type RoutePath = (typeof routes)[number]["path"];

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
    component: ContentWageListPage,
    path: "/",
  },
  {
    component: ContentRewardListPage,
    path: "/content-reward-list",
  },
  {
    component: ItemPriceListPage,
    path: "/item-price-list",
  },
  {
    component: PrivacyPolicyPage,
    path: "/privacy-policy",
  },
  {
    component: AdminPage,
    path: "/admin",
  },
  {
    component: NotFoundPage,
    path: "*",
  },
] as const;

export const Routes = () => {
  return (
    <ReactRouter.Routes>
      {routes.map(({ component, path }) => (
        <ReactRouter.Route element={createElement(component)} key={path} path={path} />
      ))}
    </ReactRouter.Routes>
  );
};

export type RoutePath = (typeof routes)[number]["path"];

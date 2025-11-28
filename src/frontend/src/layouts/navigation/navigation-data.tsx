import { RoutePath } from "~/libs/app/router";

type NavigationData = {
  label: string;
  url: RoutePath;
};

export const navigationData: NavigationData[] = [
  {
    label: "컨텐츠별 시급",
    url: "/",
  },
  {
    label: "컨텐츠별 보상",
    url: "/content-reward-list",
  },
  {
    label: "아이템 시세",
    url: "/item-price-list",
  },
];

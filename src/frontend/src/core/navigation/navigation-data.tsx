import { RoutePath } from "../app/router";

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
    label: "컨텐츠별 수익",
    url: "/content-reward-list",
  },
];

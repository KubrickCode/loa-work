import { RoutePath } from "../app/router";

type NavigationData = {
  label: string;
  url: RoutePath;
};

export const navigationData: NavigationData[] = [
  {
    label: "대시보드",
    url: "/",
  },
  {
    label: "컨텐츠별 수익",
    url: "/content-reward-list",
  },
];

import { Page } from "~/core/page";
import { AuctionItemTab, ExtraItemTab, MarketItemTab } from "./tabs";
import { Tabs } from "~/core/tabs";

export const ItemPriceListPage = () => {
  const tabPanels = [
    {
      label: "거래소 아이템",
      component: <MarketItemTab />,
    },
    {
      label: "경매장 아이템",
      component: <AuctionItemTab />,
    },
    {
      label: "기타 아이템",
      component: <ExtraItemTab />,
    },
  ];

  return (
    <Page>
      <Tabs panels={tabPanels} />
    </Page>
  );
};

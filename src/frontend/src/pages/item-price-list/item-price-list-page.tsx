import { Page } from "~/core/page";
import { Tabs } from "~/core/tabs";

import { AuctionItemTab, ExtraItemTab, MarketItemTab } from "./tabs";

export const ItemPriceListPage = () => {
  const tabPanels = [
    {
      id: "market-item",
      label: "거래소 아이템",
      component: <MarketItemTab />,
    },
    {
      id: "auction-item",
      label: "경매장 아이템",
      component: <AuctionItemTab />,
    },
    {
      id: "extra-item",
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

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
    <Page
      description="로스트아크 실시간 아이템 시세 정보를 제공합니다. 거래소 아이템, 경매장 아이템의 최신 가격을 확인하고 시장 동향을 파악하세요."
      title="아이템 시세"
    >
      <Tabs panels={tabPanels} />
    </Page>
  );
};

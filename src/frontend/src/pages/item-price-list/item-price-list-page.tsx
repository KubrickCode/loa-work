import { Page } from "~/core/page";
import { SplitLayout } from "~/core/layout";

import { MarketItemListTable } from "./components/market-item-list-table";
import { AuctionItemListTable } from "./components/auction-item-list-table";
import { AccordionCard } from "~/core/accordion";

export const ItemPriceListPage = () => {
  return (
    <Page>
      <SplitLayout
        firstGroup={
          <AccordionCard title="거래소 아이템">
            <MarketItemListTable />
          </AccordionCard>
        }
        secondGroup={
          <AccordionCard title="경매장 아이템">
            <AuctionItemListTable />
          </AccordionCard>
        }
      />
    </Page>
  );
};

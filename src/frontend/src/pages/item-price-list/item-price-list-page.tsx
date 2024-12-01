import { Page } from "~/core/page";
import { Section } from "~/core/section";
import { SplitLayout } from "~/core/layout";

import { MarketItemListTable } from "./components/market-item-list-table";
import { AuctionItemListTable } from "./components/auction-item-list-table";

export const ItemPriceListPage = () => {
  return (
    <Page>
      <SplitLayout
        firstGroup={
          <Section>
            <MarketItemListTable />
          </Section>
        }
        secondGroup={
          <Section>
            <AuctionItemListTable />
          </Section>
        }
      />
    </Page>
  );
};

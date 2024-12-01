import { Page } from "~/core/page";
import { SplitLayout } from "~/core/layout";

import { MarketItemListTable } from "./components/market-item-list-table";
import { AuctionItemListTable } from "./components/auction-item-list-table";
import { AccordionCard } from "~/core/accordion";
import { Suspense } from "react";
import { Loader } from "~/core/loader";

export const ItemPriceListPage = () => {
  return (
    <Page>
      <SplitLayout
        firstGroup={
          <AccordionCard title="거래소 아이템">
            <Suspense fallback={<Loader.TableSkeleton line={10} />}>
              <MarketItemListTable />
            </Suspense>
          </AccordionCard>
        }
        secondGroup={
          <AccordionCard title="경매장 아이템">
            <Suspense fallback={<Loader.TableSkeleton line={30} />}>
              <AuctionItemListTable />
            </Suspense>
          </AccordionCard>
        }
      />
    </Page>
  );
};

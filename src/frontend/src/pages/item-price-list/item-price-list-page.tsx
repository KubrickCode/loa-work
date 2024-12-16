import { Page } from "~/core/page";
import { SplitLayout } from "~/core/layout";

import { MarketItemListTable } from "./components/market-item-list-table";
import { AuctionItemListTable } from "./components/auction-item-list-table";
import { AccordionCard } from "~/core/accordion";
import { Suspense } from "react";
import { Loader } from "~/core/loader";
import { ExtraItemListTable } from "./components/extra-item-list-table";

export const ItemPriceListPage = () => {
  return (
    <Page>
      <SplitLayout
        firstGroup={
          <>
            <AccordionCard title="기타 아이템">
              <Suspense fallback={<Loader.TableSkeleton line={2} />}>
                <ExtraItemListTable />
              </Suspense>
            </AccordionCard>
            <AccordionCard title="재련 재료">
              <Suspense fallback={<Loader.TableSkeleton line={10} />}>
                <MarketItemListTable categoryName="재련 재료" />
              </Suspense>
            </AccordionCard>
            <AccordionCard title="재련 추가 재료">
              <Suspense fallback={<Loader.TableSkeleton line={10} />}>
                <MarketItemListTable categoryName="재련 추가 재료" />
              </Suspense>
            </AccordionCard>
            <AccordionCard title="유물 각인서">
              <Suspense fallback={<Loader.TableSkeleton line={10} />}>
                <MarketItemListTable categoryName="각인서" grade="유물" />
              </Suspense>
            </AccordionCard>
          </>
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

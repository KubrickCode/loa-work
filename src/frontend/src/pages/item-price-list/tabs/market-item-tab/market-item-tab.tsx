import { Suspense } from "react";

import { AccordionCard } from "~/core/accordion";
import { SplitLayout } from "~/core/layout";
import { TableSkeleton } from "~/core/loader";

import { MarketItemListTable } from "./components/market-item-list-table";

export const MarketItemTab = () => {
  return (
    <SplitLayout
      firstGroup={
        <>
          <AccordionCard title="재련 재료">
            <Suspense fallback={<TableSkeleton line={4} />}>
              <MarketItemListTable categoryName="재련 재료" />
            </Suspense>
          </AccordionCard>
          <AccordionCard title="재련 추가 재료">
            <Suspense fallback={<TableSkeleton line={2} />}>
              <MarketItemListTable categoryName="재련 추가 재료" />
            </Suspense>
          </AccordionCard>
        </>
      }
      secondGroup={
        <AccordionCard title="유물 각인서">
          <Suspense fallback={<TableSkeleton line={10} />}>
            <MarketItemListTable
              categoryName="각인서"
              defaultSorting={{
                sortKey: "currentMinPrice",
                value: "desc",
              }}
              grade="유물"
              pagination
            />
          </Suspense>
        </AccordionCard>
      }
    />
  );
};

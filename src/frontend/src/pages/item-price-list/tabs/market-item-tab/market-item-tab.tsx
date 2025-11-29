import { Suspense } from "react";

import { AccordionCard } from "~/components/accordion";
import { TextLoader } from "~/components/loader";
import { SplitLayout } from "~/layouts/layout";

import { MarketItemListTable } from "./components/market-item-list-table";

export const MarketItemTab = () => {
  return (
    <SplitLayout
      firstGroup={
        <>
          <AccordionCard title="재련 재료">
            <Suspense fallback={<TextLoader />}>
              <MarketItemListTable categoryName="재련 재료" />
            </Suspense>
          </AccordionCard>
          <AccordionCard title="재련 추가 재료">
            <Suspense fallback={<TextLoader />}>
              <MarketItemListTable categoryName="재련 추가 재료" />
            </Suspense>
          </AccordionCard>
        </>
      }
      secondGroup={
        <AccordionCard title="유물 각인서">
          <Suspense fallback={<TextLoader />}>
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

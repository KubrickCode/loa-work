import { Suspense } from "react";

import { AccordionCard } from "~/core/accordion";
import { SplitLayout } from "~/core/layout";
import { TableSkeleton } from "~/core/loader";

import { AuctionItemListTable } from "./components/auction-item-list-table";

export const AuctionItemTab = () => {
  return (
    <>
      <SplitLayout
        firstGroup={
          <AccordionCard title="겁화의 보석">
            <Suspense fallback={<TableSkeleton line={10} />}>
              <AuctionItemListTable nameKeyword="겁화의 보석" />
            </Suspense>
          </AccordionCard>
        }
        secondGroup={
          <AccordionCard title="작열의 보석">
            <Suspense fallback={<TableSkeleton line={10} />}>
              <AuctionItemListTable nameKeyword="작열의 보석" />
            </Suspense>
          </AccordionCard>
        }
      />
    </>
  );
};

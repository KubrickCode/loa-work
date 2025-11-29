import { Suspense } from "react";

import { AccordionCard } from "~/components/accordion";
import { TextLoader } from "~/components/loader";
import { SplitLayout } from "~/layouts/layout";

import { AuctionItemListTable } from "./components/auction-item-list-table";

export const AuctionItemTab = () => {
  return (
    <>
      <SplitLayout
        firstGroup={
          <AccordionCard title="겁화의 보석">
            <Suspense fallback={<TextLoader />}>
              <AuctionItemListTable nameKeyword="겁화의 보석" />
            </Suspense>
          </AccordionCard>
        }
        secondGroup={
          <AccordionCard title="작열의 보석">
            <Suspense fallback={<TextLoader />}>
              <AuctionItemListTable nameKeyword="작열의 보석" />
            </Suspense>
          </AccordionCard>
        }
      />
    </>
  );
};

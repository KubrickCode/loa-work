import { Suspense } from "react";
import { AccordionCard } from "~/core/accordion";
import { Loader } from "~/core/loader";
import { AuctionItemListTable } from "./components/auction-item-list-table";

export const AuctionItemTab = () => {
  return (
    <AccordionCard title="경매장 아이템">
      <Suspense fallback={<Loader.TableSkeleton line={30} />}>
        <AuctionItemListTable />
      </Suspense>
    </AccordionCard>
  );
};

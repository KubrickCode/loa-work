import { Suspense } from "react";
import { AccordionCard } from "~/core/accordion";
import { Loader } from "~/core/loader";
import { MarketItemListTable } from "./components/market-item-list-table";

export const MarketItemTab = () => {
  return (
    <>
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
  );
};

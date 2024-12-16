import { Suspense } from "react";
import { AccordionCard } from "~/core/accordion";
import { Loader } from "~/core/loader";
import { MarketItemListTable } from "./components/market-item-list-table";
import { SplitLayout } from "~/core/layout";

export const MarketItemTab = () => {
  return (
    <SplitLayout
      firstGroup={
        <>
          <AccordionCard title="재련 재료">
            <Suspense fallback={<Loader.TableSkeleton line={4} />}>
              <MarketItemListTable categoryName="재련 재료" />
            </Suspense>
          </AccordionCard>
          <AccordionCard title="재련 추가 재료">
            <Suspense fallback={<Loader.TableSkeleton line={2} />}>
              <MarketItemListTable categoryName="재련 추가 재료" />
            </Suspense>
          </AccordionCard>
        </>
      }
      secondGroup={
        <AccordionCard title="유물 각인서">
          <Suspense fallback={<Loader.TableSkeleton line={30} />}>
            <MarketItemListTable categoryName="각인서" grade="유물" />
          </Suspense>
        </AccordionCard>
      }
    />
  );
};

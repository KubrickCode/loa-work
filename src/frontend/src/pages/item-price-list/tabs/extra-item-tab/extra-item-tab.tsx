import { Suspense } from "react";

import { AccordionCard } from "~/core/accordion";
import { TableSkeleton } from "~/core/loader";

import { ExtraItemListTable } from "./components/extra-item-list-table";

export const ExtraItemTab = () => {
  return (
    <AccordionCard title="기타 아이템">
      <Suspense fallback={<TableSkeleton line={2} />}>
        <ExtraItemListTable />
      </Suspense>
    </AccordionCard>
  );
};

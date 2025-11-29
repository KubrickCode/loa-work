import { Suspense } from "react";

import { AccordionCard } from "~/components/accordion";
import { TextLoader } from "~/components/loader";

import { ExtraItemListTable } from "./components/extra-item-list-table";

export const ExtraItemTab = () => {
  return (
    <AccordionCard title="기타 아이템">
      <Suspense fallback={<TextLoader />}>
        <ExtraItemListTable />
      </Suspense>
    </AccordionCard>
  );
};

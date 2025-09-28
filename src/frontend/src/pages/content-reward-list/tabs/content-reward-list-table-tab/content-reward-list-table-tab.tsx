import { Suspense } from "react";

import { TableSkeleton } from "~/core/loader";
import { Section } from "~/core/section";

import { ContentRewardListTable } from "./components/content-reward-list-table";
import { ContentRewardListPageProvider } from "../../content-reward-list-page-context";
import { ContentRewardListTableFilters } from "./components/content-reward-list-table-filters";

export const ContentRewardListTableTab = () => {
  return (
    <Section>
      <ContentRewardListPageProvider>
        <ContentRewardListTableFilters />
        <Suspense fallback={<TableSkeleton columnCount={8} rowCount={10} />}>
          <ContentRewardListTable />
        </Suspense>
      </ContentRewardListPageProvider>
    </Section>
  );
};

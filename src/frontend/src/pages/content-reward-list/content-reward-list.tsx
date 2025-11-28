import { Suspense } from "react";

import { TableSkeleton } from "~/components/loader";

import { ContentRewardListTable, ContentRewardListTableFilters } from "./components";
import { ContentRewardListPageProvider } from "./content-reward-list-page-context";

export const ContentRewardList = () => {
  return (
    <ContentRewardListPageProvider>
      <ContentRewardListTableFilters />
      <Suspense fallback={<TableSkeleton columnCount={8} rowCount={10} />}>
        <ContentRewardListTable />
      </Suspense>
    </ContentRewardListPageProvider>
  );
};

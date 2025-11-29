import { Suspense } from "react";

import { TextLoader } from "~/components/loader";

import { ContentRewardListTable, ContentRewardListTableFilters } from "./components";
import { ContentRewardListPageProvider } from "./content-reward-list-page-context";

export const ContentRewardList = () => {
  return (
    <ContentRewardListPageProvider>
      <ContentRewardListTableFilters />
      <Suspense fallback={<TextLoader />}>
        <ContentRewardListTable />
      </Suspense>
    </ContentRewardListPageProvider>
  );
};

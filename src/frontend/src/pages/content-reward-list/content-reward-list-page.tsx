import { Suspense } from "react";

import { Page } from "~/core/page";
import { Section } from "~/core/section";
import { SkeletonText } from "~/chakra-components/ui/skeleton";

import { ContentRewardListTable } from "./components/content-reward-list-table";
import { ContentRewardListTableFilter } from "./components/content-reward-list-table-filter";
import { ContentRewardListTableProvider } from "./components/content-reward-list-table-context";

export const ContentRewardListPage = () => {
  return (
    <Page>
      <Section>
        <ContentRewardListTableProvider>
          <ContentRewardListTableFilter />
          <Suspense fallback={<SkeletonText noOfLines={30} gap="4" p={4} />}>
            <ContentRewardListTable />
          </Suspense>
        </ContentRewardListTableProvider>
      </Section>
    </Page>
  );
};

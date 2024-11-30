import { Suspense } from "react";

import { Page } from "~/core/page";
import { Section } from "~/core/section";
import { Loader } from "~/core/loader";

import { ContentRewardListTable } from "./components/content-reward-list-table";
import { ContentRewardListTableFilter } from "./components/content-reward-list-table-filter";
import { ContentRewardListTableProvider } from "./components/content-reward-list-table-context";

export const ContentRewardListPage = () => {
  return (
    <Page>
      <Section>
        <ContentRewardListTableProvider>
          <ContentRewardListTableFilter />
          <Suspense fallback={<Loader.TableSkeleton line={30} />}>
            <ContentRewardListTable />
          </Suspense>
        </ContentRewardListTableProvider>
      </Section>
    </Page>
  );
};

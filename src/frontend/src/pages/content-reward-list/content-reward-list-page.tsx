import { Suspense } from "react";

import { Page } from "~/core/page";
import { Section } from "~/core/section";
import { Loader } from "~/core/loader";

import { ContentRewardListTable } from "./components/content-reward-list-table";
import { ContentRewardListTableFilter } from "./components/content-reward-list-table-filter";
import { ContentRewardListTableProvider } from "./components/content-reward-list-table-context";
import { Flex } from "@chakra-ui/react";
import { ItemStatUpdateToggleTip } from "~/shared/item";

export const ContentRewardListPage = () => {
  return (
    <Page>
      <Section>
        <ContentRewardListTableProvider>
          <Flex alignItems="center" gap={2}>
            <ContentRewardListTableFilter />
            <ItemStatUpdateToggleTip />
          </Flex>
          <Suspense fallback={<Loader.TableSkeleton line={30} />}>
            <ContentRewardListTable />
          </Suspense>
        </ContentRewardListTableProvider>
      </Section>
    </Page>
  );
};

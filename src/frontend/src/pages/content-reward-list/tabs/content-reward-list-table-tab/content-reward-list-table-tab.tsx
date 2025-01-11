import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";

import { Loader } from "~/core/loader";
import { Section } from "~/core/section";
import { ItemStatUpdateToggleTip } from "~/shared/item";

import { ContentRewardListTable } from "./components/content-reward-list-table";
import { ContentRewardListTableFilter } from "./components/content-reward-list-table-filter";
import { ContentRewardListPageProvider } from "../../content-reward-list-page-context";

export const ContentRewardListTableTab = () => {
  return (
    <Section>
      <ContentRewardListPageProvider>
        <Flex alignItems="center" gap={2}>
          <ContentRewardListTableFilter />
          <ItemStatUpdateToggleTip />
        </Flex>
        <Suspense fallback={<Loader.TableSkeleton line={30} />}>
          <ContentRewardListTable />
        </Suspense>
      </ContentRewardListPageProvider>
    </Section>
  );
};

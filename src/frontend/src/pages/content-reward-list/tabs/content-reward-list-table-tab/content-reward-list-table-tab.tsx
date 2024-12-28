import { Section } from "~/core/section";
import { ContentRewardListTableFilter } from "./components/content-reward-list-table-filter";
import { ItemStatUpdateToggleTip } from "~/shared/item";
import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import { Loader } from "~/core/loader";
import { ContentRewardListTable } from "./components/content-reward-list-table";
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

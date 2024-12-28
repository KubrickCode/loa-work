import { Section } from "~/core/section";
import { ContentRewardListTableProvider } from "./components/content-reward-list-table-context";
import { ContentRewardListTableFilter } from "./components/content-reward-list-table-filter";
import { ItemStatUpdateToggleTip } from "~/shared/item";
import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import { Loader } from "~/core/loader";
import { ContentRewardListTable } from "./components/content-reward-list-table";

export const ContentRewardListTableTab = () => {
  return (
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
  );
};

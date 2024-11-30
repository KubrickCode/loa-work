import { Page } from "~/core/page";

import { ContentRewardListTable } from "./components/content-reward-list-table";
import { AccordionCard } from "~/core/accordion";

export const ContentRewardListPage = () => {
  return (
    <Page>
      <AccordionCard title="전체 컨텐츠">
        <ContentRewardListTable />
      </AccordionCard>
    </Page>
  );
};

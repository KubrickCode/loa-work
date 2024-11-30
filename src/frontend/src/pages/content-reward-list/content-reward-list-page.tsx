import { Page } from "~/core/page";
import { Section } from "~/core/section";

import { ContentRewardListTable } from "./components/content-reward-list-table";
import { ContentRewardListTableFilter } from "./components/content-reward-list-table-filter";

export const ContentRewardListPage = () => {
  return (
    <Page>
      <Section>
        <ContentRewardListTableFilter />
        <ContentRewardListTable />
      </Section>
    </Page>
  );
};

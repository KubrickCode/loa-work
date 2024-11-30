import { Page } from "~/core/page";
import { Section } from "~/core/section";

import { ContentRewardListTable } from "./components/content-reward-list-table";

export const ContentRewardListPage = () => {
  return (
    <Page>
      <Section>
        <ContentRewardListTable />
      </Section>
    </Page>
  );
};

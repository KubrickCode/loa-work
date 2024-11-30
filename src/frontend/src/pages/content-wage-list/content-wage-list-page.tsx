import { Page } from "~/core/page";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { Section } from "~/core/section";

export const ContentWageListPage = () => {
  return (
    <Page>
      <Section>
        <ContentWageListTable />
      </Section>
    </Page>
  );
};

import { Page } from "~/core/page";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { Section } from "~/core/section";
import { ContentWageListTableFilter } from "./components/content-wage-list-table-filter";
import { ContentWageListTableProvider } from "./components/content-wage-list-table-context";

export const ContentWageListPage = () => {
  return (
    <Page>
      <Section>
        <ContentWageListTableProvider>
          <ContentWageListTableFilter />
          <ContentWageListTable />
        </ContentWageListTableProvider>
      </Section>
    </Page>
  );
};

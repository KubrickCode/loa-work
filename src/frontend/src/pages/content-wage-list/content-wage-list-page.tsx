import { Page } from "~/core/page";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { Section } from "~/core/section";
import { ContentWageListTableFilter } from "./components/content-wage-list-table-filter";
import { ContentWageListTableProvider } from "./components/content-wage-list-table-context";
import { Suspense } from "react";
import { Loader } from "~/core/loader";

export const ContentWageListPage = () => {
  return (
    <Page>
      <Section>
        <ContentWageListTableProvider>
          <ContentWageListTableFilter />
          <Suspense fallback={<Loader.TableSkeleton line={30} />}>
            <ContentWageListTable />
          </Suspense>
        </ContentWageListTableProvider>
      </Section>
    </Page>
  );
};

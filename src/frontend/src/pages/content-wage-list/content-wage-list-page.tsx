import { Page } from "~/core/page";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { Section } from "~/core/section";
import { ContentWageListTableProvider } from "./components/content-wage-list-table-context";
import { Suspense } from "react";
import { Loader } from "~/core/loader";
import { ContentWageListTableFilters } from "./components/content-wage-list-table-filters";

export const ContentWageListPage = () => {
  return (
    <Page>
      <Section>
        <ContentWageListTableProvider>
          <ContentWageListTableFilters />
          <Suspense fallback={<Loader.TableSkeleton line={30} />}>
            <ContentWageListTable />
          </Suspense>
        </ContentWageListTableProvider>
      </Section>
    </Page>
  );
};

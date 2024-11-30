import { Page } from "~/core/page";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { Section } from "~/core/section";
import { ContentWageListTableFilter } from "./components/content-wage-list-table-filter";
import { ContentWageListTableProvider } from "./components/content-wage-list-table-context";
import { Suspense } from "react";
import { SkeletonText } from "~/chakra-components/ui/skeleton";

export const ContentWageListPage = () => {
  return (
    <Page>
      <Section>
        <ContentWageListTableProvider>
          <ContentWageListTableFilter />
          <Suspense fallback={<SkeletonText noOfLines={30} gap="4" p={4} />}>
            <ContentWageListTable />
          </Suspense>
        </ContentWageListTableProvider>
      </Section>
    </Page>
  );
};

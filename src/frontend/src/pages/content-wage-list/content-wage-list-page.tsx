import { Page } from "~/core/page";
import { AccordionCard } from "~/core/accordion";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { ContentType } from "~/core/graphql/generated";
import { SplitLayout } from "~/core/layout";

export const ContentWageListPage = () => {
  return (
    <Page>
      <SplitLayout
        firstGroup={
          <>
            <AccordionCard title="전체 컨텐츠">
              <ContentWageListTable />
            </AccordionCard>
            <AccordionCard title="쿠르잔 전선">
              <ContentWageListTable contentType={ContentType.KURZAN_FRONT} />
            </AccordionCard>
            <AccordionCard title="가디언 토벌">
              <ContentWageListTable contentType={ContentType.GUARDIAN_RAID} />
            </AccordionCard>
          </>
        }
        secondGroup={
          <>
            <AccordionCard title="카제로스 레이드">
              <ContentWageListTable contentType={ContentType.KAZEROS_RAID} />
            </AccordionCard>
            <AccordionCard title="군단장 레이드">
              <ContentWageListTable
                contentType={ContentType.LEGION_COMMANDER_RAID}
              />
            </AccordionCard>
            <AccordionCard title="큐브">
              <ContentWageListTable contentType={ContentType.CUBE} />
            </AccordionCard>
          </>
        }
      />
    </Page>
  );
};

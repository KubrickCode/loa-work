import { Flex, VStack } from "@chakra-ui/react";
import { Page } from "~/core/page";
import { AccordionCard } from "~/core/accordion";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { ContentType } from "~/core/graphql/generated";

export const ContentWageListPage = () => {
  return (
    <Page>
      <Flex gap={4}>
        <VStack flex="1" gap={4}>
          <AccordionCard title="전체 컨텐츠">
            <ContentWageListTable />
          </AccordionCard>
          <AccordionCard title="가디언 토벌">
            <ContentWageListTable contentType={ContentType.GUARDIAN_RAID} />
          </AccordionCard>
          <AccordionCard title="카제로스 레이드">
            <ContentWageListTable contentType={ContentType.KAZEROS_RAID} />
          </AccordionCard>
        </VStack>
        <VStack flex="1" gap={4}>
          <AccordionCard title="쿠르잔 전선">
            <ContentWageListTable contentType={ContentType.KURZAN_FRONT} />
          </AccordionCard>
          <AccordionCard title="큐브">
            <ContentWageListTable contentType={ContentType.CUBE} />
          </AccordionCard>
        </VStack>
      </Flex>
    </Page>
  );
};

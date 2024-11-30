import { Flex, VStack } from "@chakra-ui/react";
import { Page } from "~/core/page";
import { AccordionCard } from "~/core/accordion";
import { ContentWageListTable } from "./components/content-wage-list-table";

export const ContentWageListPage = () => {
  return (
    <Page>
      <Flex gap={4}>
        <VStack flex="1" gap={4}>
          <AccordionCard title="전체 컨텐츠">
            <ContentWageListTable />
          </AccordionCard>
          <AccordionCard title="Empty State">Empty State</AccordionCard>
        </VStack>
        <VStack flex="1" gap={4}>
          <AccordionCard title="Empty State">Empty State</AccordionCard>
          <AccordionCard title="Empty State">Empty State</AccordionCard>
        </VStack>
      </Flex>
    </Page>
  );
};

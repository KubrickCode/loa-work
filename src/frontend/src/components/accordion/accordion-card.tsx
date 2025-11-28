import { PropsWithChildren } from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "~/components/chakra/ui/accordion";

export type AccordionProps = PropsWithChildren & {
  title: string;
};

export const AccordionCard = ({ children, title }: AccordionProps) => {
  return (
    <AccordionRoot
      _hover={{
        shadow: "md",
      }}
      bg="bg.surface"
      borderColor="border.default"
      borderRadius="lg"
      borderWidth="1px"
      collapsible
      defaultValue={["all-contents"]}
      overflow="hidden"
      shadow="sm"
      transition="all 0.2s ease-in-out"
      variant="enclosed"
    >
      <AccordionItem value="all-contents">
        <AccordionItemTrigger>{title}</AccordionItemTrigger>
        <AccordionItemContent>{children}</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};

import { PropsWithChildren } from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "~/core/chakra-components/ui/accordion";

export type AccordionProps = PropsWithChildren & {
  title: string;
};

export const AccordionCard = ({ children, title }: AccordionProps) => {
  return (
    <AccordionRoot
      collapsible
      defaultValue={["all-contents"]}
      variant="enclosed"
    >
      <AccordionItem value="all-contents">
        <AccordionItemTrigger cursor="pointer">{title}</AccordionItemTrigger>
        <AccordionItemContent>{children}</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};

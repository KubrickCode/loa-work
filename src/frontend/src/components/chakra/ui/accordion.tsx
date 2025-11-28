import { Accordion, HStack } from "@chakra-ui/react";
import * as React from "react";
import { LuChevronDown } from "react-icons/lu";

type AccordionItemTriggerProps = {
  indicatorPlacement?: "start" | "end";
} & Accordion.ItemTriggerProps;

export const AccordionItemTrigger = React.forwardRef<HTMLButtonElement, AccordionItemTriggerProps>(
  function AccordionItemTrigger(props, ref) {
    const { children, indicatorPlacement = "end", ...rest } = props;
    return (
      <Accordion.ItemTrigger {...rest} ref={ref}>
        {indicatorPlacement === "start" && (
          <Accordion.ItemIndicator rotate={{ _open: "0deg", base: "-90deg" }}>
            <LuChevronDown />
          </Accordion.ItemIndicator>
        )}
        <HStack flex="1" gap="4" textAlign="start" width="full">
          {children}
        </HStack>
        {indicatorPlacement === "end" && (
          <Accordion.ItemIndicator>
            <LuChevronDown />
          </Accordion.ItemIndicator>
        )}
      </Accordion.ItemTrigger>
    );
  }
);

type AccordionItemContentProps = {} & Accordion.ItemContentProps;

export const AccordionItemContent = React.forwardRef<HTMLDivElement, AccordionItemContentProps>(
  function AccordionItemContent(props, ref) {
    return (
      <Accordion.ItemContent>
        <Accordion.ItemBody {...props} ref={ref} />
      </Accordion.ItemContent>
    );
  }
);

export const AccordionRoot = Accordion.Root;
export const AccordionItem = Accordion.Item;

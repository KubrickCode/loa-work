import { Drawer as ChakraDrawer, Portal } from "@chakra-ui/react";
import * as React from "react";

import { CloseButton } from "./close-button";

type DrawerContentProps = {
  offset?: ChakraDrawer.ContentProps["padding"];
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
} & ChakraDrawer.ContentProps;

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(props, ref) {
    const { children, offset, portalled = true, portalRef, ...rest } = props;
    return (
      <Portal container={portalRef} disabled={!portalled}>
        <ChakraDrawer.Positioner padding={offset}>
          <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
            {children}
          </ChakraDrawer.Content>
        </ChakraDrawer.Positioner>
      </Portal>
    );
  }
);

export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDrawer.CloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  return (
    <ChakraDrawer.CloseTrigger insetEnd="2" position="absolute" top="2" {...props} asChild>
      <CloseButton ref={ref} size="sm" />
    </ChakraDrawer.CloseTrigger>
  );
});

export const DrawerTrigger = ChakraDrawer.Trigger;
export const DrawerRoot = ChakraDrawer.Root;
export const DrawerFooter = ChakraDrawer.Footer;
export const DrawerHeader = ChakraDrawer.Header;
export const DrawerBody = ChakraDrawer.Body;
export const DrawerBackdrop = ChakraDrawer.Backdrop;
export const DrawerDescription = ChakraDrawer.Description;
export const DrawerTitle = ChakraDrawer.Title;
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger;

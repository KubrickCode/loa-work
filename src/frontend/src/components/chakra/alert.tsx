import { Alert as ChakraAlert } from "@chakra-ui/react";
import * as React from "react";

import { CloseButton } from "./close-button";

export type AlertProps = {
  closable?: boolean;
  endElement?: React.ReactNode;
  icon?: React.ReactElement;
  onClose?: () => void;
  startElement?: React.ReactNode;
  title?: React.ReactNode;
} & Omit<ChakraAlert.RootProps, "title">;

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  const { children, closable, endElement, icon, onClose, startElement, title, ...rest } = props;
  return (
    <ChakraAlert.Root ref={ref} {...rest}>
      {startElement || <ChakraAlert.Indicator>{icon}</ChakraAlert.Indicator>}
      {children ? (
        <ChakraAlert.Content>
          <ChakraAlert.Title>{title}</ChakraAlert.Title>
          <ChakraAlert.Description>{children}</ChakraAlert.Description>
        </ChakraAlert.Content>
      ) : (
        <ChakraAlert.Title flex="1">{title}</ChakraAlert.Title>
      )}
      {endElement}
      {closable && (
        <CloseButton
          alignSelf="flex-start"
          insetEnd="-2"
          onClick={onClose}
          pos="relative"
          size="sm"
          top="-2"
        />
      )}
    </ChakraAlert.Root>
  );
});

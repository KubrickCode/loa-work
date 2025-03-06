import { Center, Flex, FlexProps, useDisclosure } from "@chakra-ui/react";
import {
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
  Suspense,
} from "react";

import { BlockLoader } from "../loader";

export type DialogTriggerProps<T extends ElementType> = FlexProps & {
  dialog: T;
  dialogProps?: Omit<ComponentPropsWithoutRef<T>, "open" | "onClose">;
};

export const DialogTrigger = <T extends ElementType>({
  children,
  dialog,
  dialogProps,
  ...otherProps
}: DialogTriggerProps<T>) => {
  const { onOpen, onClose, open } = useDisclosure();

  const renderModal = () => {
    if (!open) return null;

    return (
      <Suspense fallback={<BackdropLoader />}>
        {createElement(dialog, {
          ...dialogProps,
          onClose,
          open,
        })}
      </Suspense>
    );
  };

  return (
    <>
      <Flex
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        {...otherProps}
      >
        {children}
      </Flex>
      {renderModal()}
    </>
  );
};

const BackdropLoader = () => {
  return (
    <Center
      bg="blackAlpha.600"
      bottom={0}
      left={0}
      position="fixed"
      right={0}
      top={0}
      zIndex="modal"
    >
      <BlockLoader />
    </Center>
  );
};

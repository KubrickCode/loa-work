import { Flex, FlexProps, useDisclosure } from "@chakra-ui/react";
import { ComponentPropsWithoutRef, createElement, ElementType } from "react";

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

    return createElement(dialog, {
      ...dialogProps,
      onClose,
      open,
    });
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

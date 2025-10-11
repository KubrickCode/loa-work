import { Flex, FlexProps } from "@chakra-ui/react";
import { ElementType } from "react";

import { useDialog, UseDialogProps } from "./use-dialog";

export type DialogTriggerProps<T extends ElementType> = FlexProps & UseDialogProps<T>;

export const DialogTrigger = <T extends ElementType>({
  children,
  dialog,
  dialogProps,
  disabled,
  ...otherProps
}: DialogTriggerProps<T>) => {
  const { onOpen, renderModal } = useDialog({
    dialog,
    dialogProps,
    disabled,
  });

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

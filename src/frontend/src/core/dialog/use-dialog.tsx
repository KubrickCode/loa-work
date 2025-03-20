import { Center, useDisclosure } from "@chakra-ui/react";
import {
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
  Suspense,
  useState,
} from "react";

import { BlockLoader } from "../loader";

export type UseDialogProps<T extends ElementType> = {
  dialog: T;
  dialogProps?: Omit<
    ComponentPropsWithoutRef<T>,
    "children" | "open" | "onClose"
  >;
};

export const useDialog = <T extends ElementType>({
  dialog,
  dialogProps: initialDialogProps,
}: UseDialogProps<T>) => {
  const { onOpen, onClose, open, onToggle } = useDisclosure();
  const [currentDialogProps, setCurrentDialogProps] =
    useState(initialDialogProps);

  const handleOpen = (newDialogProps?: UseDialogProps<T>["dialogProps"]) => {
    if (newDialogProps) {
      setCurrentDialogProps({ ...initialDialogProps, ...newDialogProps });
    }

    onOpen();
  };

  const renderModal = () => {
    if (!open) return null;

    return (
      <Suspense fallback={<BackdropLoader />}>
        {createElement(dialog, {
          ...currentDialogProps,
          onClose,
          open,
        })}
      </Suspense>
    );
  };

  return {
    onClose,
    onOpen: handleOpen,
    onToggle,
    open,
    renderModal,
  };
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

import { Center, useDisclosure } from "@chakra-ui/react";
import {
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
  Suspense,
} from "react";

import { BlockLoader } from "../loader";

export type UseDialogProps<T extends ElementType> = {
  dialog: T;
  dialogProps?: Omit<ComponentPropsWithoutRef<T>, "open" | "onClose">;
};

export const useDialog = <T extends ElementType>({
  dialog,
  dialogProps,
}: UseDialogProps<T>) => {
  const { onOpen, onClose, open, onToggle } = useDisclosure();

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

  return {
    onClose,
    onOpen,
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

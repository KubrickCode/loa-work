import { useDisclosure } from "@chakra-ui/react";
import { ComponentPropsWithoutRef, createElement, ElementType, useState } from "react";

export type UseDialogProps<T extends ElementType> = {
  dialog: T;
  dialogProps?: Omit<ComponentPropsWithoutRef<T>, "children" | "open" | "onClose">;
  disabled?: boolean;
};

export const useDialog = <T extends ElementType>({
  dialog,
  dialogProps: initialDialogProps,
  disabled,
}: UseDialogProps<T>) => {
  const { onClose, onOpen, onToggle, open } = useDisclosure();
  const [currentDialogProps, setCurrentDialogProps] = useState(initialDialogProps);

  const handleOpen = (newDialogProps?: UseDialogProps<T>["dialogProps"]) => {
    if (disabled) return;

    if (newDialogProps) {
      setCurrentDialogProps({ ...initialDialogProps, ...newDialogProps });
    }

    onOpen();
  };

  const renderModal = () => {
    if (!open || disabled) return null;

    return createElement(dialog, {
      ...currentDialogProps,
      onClose,
      open,
    });
  };

  return {
    onClose,
    onOpen: handleOpen,
    onToggle,
    open,
    renderModal,
  };
};

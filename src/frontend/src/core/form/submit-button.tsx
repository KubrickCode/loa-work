import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { Button, ButtonProps } from "~/core/chakra-components/ui/button";

export type SubmitButtonProps = Omit<ButtonProps, "children"> & {
  children?: ReactNode;
};

export const SubmitButton = ({ children, ...otherProps }: SubmitButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button
      colorPalette="blue"
      disabled={isSubmitting}
      loading={isSubmitting}
      type="submit"
      variant="solid"
      {...otherProps}
    >
      {children || "저장"}
    </Button>
  );
};

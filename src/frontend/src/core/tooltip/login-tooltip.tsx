import { Box, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { useAuth } from "../auth";
import { Tooltip } from "../chakra-components/ui/tooltip";

export type LoginTooltipProps = PropsWithChildren & {
  content?: string;
};

export const LoginTooltip = ({
  children,
  content = "로그인 후 수정 가능합니다",
}: LoginTooltipProps) => {
  const { isAuthenticated } = useAuth();
  const { open, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <Tooltip content={content} disabled={isAuthenticated} open={open} showArrow>
      <Box onMouseEnter={onOpen} onMouseLeave={onClose} onTouchStart={onToggle}>
        {children}
      </Box>
    </Tooltip>
  );
};

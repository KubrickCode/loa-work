import { Box, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { Tooltip } from "~/components/chakra/ui/tooltip";
import { useAuth } from "~/libs/auth";

export type LoginTooltipProps = PropsWithChildren & {
  content?: string;
};

export const LoginTooltip = ({
  children,
  content = "로그인 후 수정 가능합니다",
}: LoginTooltipProps) => {
  const { isAuthenticated } = useAuth();
  const { onClose, onOpen, onToggle, open } = useDisclosure();

  return (
    <Tooltip content={content} disabled={isAuthenticated} open={open} showArrow>
      <Box onMouseEnter={onOpen} onMouseLeave={onClose} onTouchStart={onToggle}>
        {children}
      </Box>
    </Tooltip>
  );
};

import { PropsWithChildren } from "react";

import { useAuth } from "../auth";
import { Tooltip } from "../chakra-components/ui/tooltip";

export const LoginTooltip = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  return (
    <Tooltip content="로그인 후 수정 가능합니다" disabled={isAuthenticated}>
      {children}
    </Tooltip>
  );
};

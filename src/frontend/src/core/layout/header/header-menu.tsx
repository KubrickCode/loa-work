import { IoIosArrowDown } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";

import { LoginDialog, useAuth } from "~/core/auth";
import { Avatar } from "~/core/chakra-components/ui/avatar";
import { Button } from "~/core/chakra-components/ui/button";
import { ColorModeIcon, useColorMode } from "~/core/chakra-components/ui/color-mode";
import { MenuContent, MenuRoot, MenuTrigger } from "~/core/chakra-components/ui/menu";
import { Dialog } from "~/core/dialog";
import { MenuItem } from "~/core/menu";

export const HeaderMenu = () => {
  const { toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();

  return (
    <MenuRoot closeOnSelect={false} positioning={{ placement: "bottom-end" }}>
      {/* MenuTrigger는 기본적으로 button 태그로 렌더링되어 MenuTrigger 내에 Button 사용 시 validateDOMNesting 에러 발생 */}
      <Button as={MenuTrigger} px={2} variant="ghost">
        <Avatar size="xs" src={user?.imageUrl} />
        {user?.displayName}
        <IoIosArrowDown />
      </Button>
      <MenuContent zIndex={1200}>
        <MenuItem onClick={toggleColorMode} value="dark-mode">
          <ColorModeIcon />
          다크모드
        </MenuItem>
        {user ? (
          <MenuItem onClick={logout} value="logout">
            <MdLogout />
            로그아웃
          </MenuItem>
        ) : (
          <Dialog.Trigger dialog={LoginDialog}>
            <MenuItem value="login">
              <MdLogin />
              로그인
            </MenuItem>
          </Dialog.Trigger>
        )}
      </MenuContent>
    </MenuRoot>
  );
};

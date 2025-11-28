import { IoIosArrowDown } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";

import { Avatar } from "~/components/chakra/ui/avatar";
import { Button } from "~/components/chakra/ui/button";
import { ColorModeIcon, useColorMode } from "~/components/chakra/ui/color-mode";
import { MenuContent, MenuRoot, MenuTrigger } from "~/components/chakra/ui/menu";
import { Dialog } from "~/components/dialog";
import { MenuItem } from "~/components/menu";
import { LoginDialog, useAuth } from "~/libs/auth";

export const HeaderMenu = () => {
  const { toggleColorMode } = useColorMode();
  const { logout, user } = useAuth();

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

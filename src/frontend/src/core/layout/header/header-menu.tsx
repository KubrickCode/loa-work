import { IoIosArrowDown } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Avatar } from "~/chakra-components/ui/avatar";
import { Button } from "~/chakra-components/ui/button";
import { ColorModeIcon, useColorMode } from "~/chakra-components/ui/color-mode";
import {
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from "~/chakra-components/ui/menu";
import { useAuth } from "~/core/auth";
import { MenuItem } from "~/core/menu";

export const HeaderMenu = () => {
  const { toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <MenuRoot closeOnSelect={false} positioning={{ placement: "bottom" }}>
      <MenuTrigger>
        <Button variant="ghost" px={2}>
          <Avatar size="xs" src={user?.imageUrl} />
          {user?.displayName}
          <IoIosArrowDown />
        </Button>
      </MenuTrigger>
      <MenuContent>
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
          <MenuItem onClick={() => navigate("/login")} value="login">
            <MdLogin /> 로그인
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  );
};

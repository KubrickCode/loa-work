import { useNavigate } from "react-router-dom";
import { Avatar } from "~/chakra-components/ui/avatar";
import { ColorModeIcon, useColorMode } from "~/chakra-components/ui/color-mode";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "~/chakra-components/ui/menu";
import { useAuth } from "~/core/auth";

export const HeaderMenu = () => {
  const { toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <MenuRoot closeOnSelect={false} positioning={{ placement: "bottom" }}>
      <MenuTrigger>
        <Avatar cursor="pointer" size="md" />
      </MenuTrigger>
      <MenuContent>
        <MenuItem onClick={toggleColorMode} value="dark-mode">
          <ColorModeIcon />
          다크모드
        </MenuItem>
        {user ? (
          <MenuItem onClick={logout} value="logout">
            로그아웃
          </MenuItem>
        ) : (
          <MenuItem onClick={() => navigate("/login")} value="login">
            로그인
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  );
};

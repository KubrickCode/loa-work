import { Avatar } from "~/chakra-components/ui/avatar";
import { ColorModeIcon, useColorMode } from "~/chakra-components/ui/color-mode";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "~/chakra-components/ui/menu";

export const HeaderMenu = () => {
  const { toggleColorMode } = useColorMode();

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
      </MenuContent>
    </MenuRoot>
  );
};

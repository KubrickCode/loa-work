import { MenuItemProps } from "@chakra-ui/react";

import { MenuItem as ChakraMenuItem } from "~/core/chakra-components/ui/menu";

export const MenuItem = (props: MenuItemProps) => {
  return <ChakraMenuItem cursor="pointer" {...props} />;
};

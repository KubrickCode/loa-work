import { MenuItemProps } from "@chakra-ui/react";
import { MenuItem as ChakraMenuItem } from "~/chakra-components/ui/menu";

export const MenuItem = (props: MenuItemProps) => {
  return <ChakraMenuItem cursor="pointer" {...props} />;
};

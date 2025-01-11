import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useColorModeValue } from "~/chakra-components/ui/color-mode";

const ArrowIcon = ({
  direction,
  color,
}: {
  direction: "down" | "up";
  color: BoxProps["color"];
}) => {
  return (
    <Box color={color} height="6px" overflow="hidden" width="8px">
      <Box margin="-3px">
        {direction === "up" ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
      </Box>
    </Box>
  );
};

export const SortControl = ({
  currentState,
  onClick,
}: {
  currentState: "asc" | "desc" | null;
  onClick: () => void;
}) => {
  const activeColor = useColorModeValue("gray.700", "gray.200");
  const inactiveColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      cursor="pointer"
      direction="column"
      gap="1px"
      onClick={onClick}
      paddingX={1}
      tabIndex={0}
    >
      <ArrowIcon
        color={currentState === "asc" ? activeColor : inactiveColor}
        direction="up"
      />
      <ArrowIcon
        color={currentState === "desc" ? activeColor : inactiveColor}
        direction="down"
      />
    </Flex>
  );
};

import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useColorModeValue } from "~/core/chakra-components/ui/color-mode";

const ArrowIcon = ({
  color,
  direction,
}: {
  color: BoxProps["color"];
  direction: "down" | "up";
}) => {
  return (
    <Box color={color} height="6px" overflow="hidden" width="8px">
      <Box margin="-3px">{direction === "up" ? <TiArrowSortedUp /> : <TiArrowSortedDown />}</Box>
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
      alignItems="center"
      cursor="pointer"
      direction="column"
      gap="1px"
      justifyContent="center"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      paddingX={1}
      role="button"
      tabIndex={0}
    >
      <ArrowIcon color={currentState === "asc" ? activeColor : inactiveColor} direction="up" />
      <ArrowIcon color={currentState === "desc" ? activeColor : inactiveColor} direction="down" />
    </Flex>
  );
};

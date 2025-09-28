import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useColorModeValue } from "~/core/chakra-components/ui/color-mode";

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
      _active={{ transform: "scale(0.95)" }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "gold.500",
        outlineOffset: "2px",
      }}
      _hover={{ bg: "gray.100" }}
      alignItems="center"
      cursor="pointer"
      direction="column"
      gap="1px"
      justifyContent="center"
      minH={{ base: "44px", md: "auto" }}
      minW={{ base: "44px", md: "auto" }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      paddingX={{ base: 2, md: 1 }}
      paddingY={{ base: 2, md: 0 }}
      role="button"
      tabIndex={0}
      transition="all 0.2s"
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

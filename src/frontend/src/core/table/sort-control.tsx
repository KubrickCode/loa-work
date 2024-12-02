import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

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
        color={currentState === "asc" ? "gray.700" : "gray.300"}
        direction="up"
      />
      <ArrowIcon
        color={currentState === "desc" ? "gray.700" : "gray.300"}
        direction="down"
      />
    </Flex>
  );
};

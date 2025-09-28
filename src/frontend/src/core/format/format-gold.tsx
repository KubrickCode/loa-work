import { Flex, Text, TextProps } from "@chakra-ui/react";

type FormatGoldProps = {
  value?: number | null;
} & Pick<TextProps, "color" | "fontWeight">;

export const FormatGold = ({
  value,
  color = "gold.500",
  fontWeight = "medium",
}: FormatGoldProps) => {
  return (
    <Flex alignItems="center" display="inline-flex" gap={1}>
      <Text color={color} fontWeight={fontWeight} lineHeight="tight">
        {value?.toLocaleString() || "0"}
      </Text>
      <Text
        color={color}
        fontWeight={fontWeight}
        lineHeight="tight"
        opacity={0.8}
      >
        G
      </Text>
    </Flex>
  );
};

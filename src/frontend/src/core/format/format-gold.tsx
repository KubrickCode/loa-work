import { Flex, FormatNumber, Image } from "@chakra-ui/react";

export const FormatGold = ({ value }: { value: number }) => {
  return (
    <Flex display="inline-flex" alignItems="center">
      <Image src="/loa-life-favicon.png" w={4} />
      <FormatNumber value={value} />
    </Flex>
  );
};

import { Flex, FormatNumber, Image } from "@chakra-ui/react";

export const FormatGold = ({ value }: { value?: number | null }) => {
  return (
    <Flex display="inline-flex" alignItems="center">
      <Image src="/loa-life-favicon.png" w={4} />
      {value ? <FormatNumber value={value} /> : <>가격 정보 없음</>}
    </Flex>
  );
};

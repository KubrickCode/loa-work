import { Flex, FormatNumber, Image } from "@chakra-ui/react";

export const FormatGold = ({ value }: { value?: number | null }) => {
  return (
    <Flex alignItems="center" display="inline-flex">
      <Image src="/loa-work-favicon.png" w={4} />
      {typeof value === "number" ? (
        <FormatNumber value={value} />
      ) : (
        <>가격 정보 없음</>
      )}
    </Flex>
  );
};

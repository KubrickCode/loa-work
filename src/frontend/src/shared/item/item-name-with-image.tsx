import { Flex, Image } from "@chakra-ui/react";

export type ItemNameWithImageProps = {
  src: string;
  name: string;
};

export const ItemNameWithImage = ({ src, name }: ItemNameWithImageProps) => {
  return (
    <Flex alignItems="center" gap={2}>
      <Image src={src} width={6} height={6} />
      {name}
    </Flex>
  );
};

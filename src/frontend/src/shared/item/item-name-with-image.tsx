import { Flex, Image } from "@chakra-ui/react";

export type ItemNameWithImageProps = {
  src: string;
  name: string;
};

export const ItemNameWithImage = ({ src, name }: ItemNameWithImageProps) => {
  return (
    <Flex alignItems="center" gap={2}>
      <Image maxHeight={6} maxWidth={6} src={src} />
      {name}
    </Flex>
  );
};

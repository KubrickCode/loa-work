import { Flex, Image } from "@chakra-ui/react";

export type ItemNameWithImageProps = {
  name: string;
  reverse?: boolean;
  src: string;
};

export const ItemNameWithImage = ({ name, reverse = false, src }: ItemNameWithImageProps) => {
  return (
    <Flex alignItems="center" gap={2}>
      {reverse ? (
        <>
          {name}
          <Image maxHeight={4} maxWidth={4} src={src} />
        </>
      ) : (
        <>
          <Image maxHeight={4} maxWidth={4} src={src} />
          {name}
        </>
      )}
    </Flex>
  );
};

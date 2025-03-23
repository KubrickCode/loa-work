import { Center } from "@chakra-ui/react";

import { Page } from "~/core/page";

export const NotFoundPage = () => {
  return (
    <Page>
      <Center h="75vh" my="auto">
        존재하지 않는 페이지입니다.
      </Center>
    </Page>
  );
};

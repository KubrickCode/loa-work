import { Center } from "@chakra-ui/react";

import { Page } from "~/core/page";

export const NotFoundPage = () => {
  return (
    <Page
      description="요청하신 페이지를 찾을 수 없습니다. 홈페이지로 돌아가서 원하는 정보를 찾아보세요."
      title="404 Not Found"
    >
      <Center h="75vh" my="auto">
        존재하지 않는 페이지입니다.
      </Center>
    </Page>
  );
};

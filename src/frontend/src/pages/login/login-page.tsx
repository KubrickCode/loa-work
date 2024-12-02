import { Button } from "~/chakra-components/ui/button";
import { Page } from "~/core/page";

export const LoginPage = () => {
  return (
    <Page>
      <Button
        onClick={() => {
          window.location.href = "/auth/google";
        }}
      >
        구글 로그인
      </Button>
      <Button
        onClick={() => {
          window.location.href = import.meta.env.VITE_DISCORD_LOGIN_URL;
        }}
      >
        디스코드 로그인
      </Button>
    </Page>
  );
};

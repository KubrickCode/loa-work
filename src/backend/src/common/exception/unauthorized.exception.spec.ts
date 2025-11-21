import { UnauthorizedException } from "./unauthorized.exception";

describe("UnauthorizedException", () => {
  it("기본 메시지로 생성", () => {
    const exception = new UnauthorizedException();

    expect(exception.message).toBe("인증이 필요합니다.");
    expect(exception.code).toBe("UNAUTHORIZED");
  });

  it("커스텀 메시지로 생성", () => {
    const exception = new UnauthorizedException("세션이 만료되었습니다.");

    expect(exception.message).toBe("세션이 만료되었습니다.");
  });
});

import { ForbiddenException } from "./forbidden.exception";

describe("ForbiddenException", () => {
  it("기본 메시지로 생성", () => {
    const exception = new ForbiddenException();

    expect(exception.message).toBe("접근 권한이 없습니다.");
    expect(exception.code).toBe("FORBIDDEN");
  });

  it("커스텀 메시지로 생성", () => {
    const exception = new ForbiddenException("관리자만 접근 가능합니다.");

    expect(exception.message).toBe("관리자만 접근 가능합니다.");
  });
});

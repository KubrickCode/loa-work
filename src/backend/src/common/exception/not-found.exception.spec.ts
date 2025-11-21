import { NotFoundException } from "./not-found.exception";

describe("NotFoundException", () => {
  it("리소스명만으로 생성", () => {
    const exception = new NotFoundException("Content");

    expect(exception.message).toBe("Content을(를) 찾을 수 없습니다.");
    expect(exception.code).toBe("NOT_FOUND");
  });

  it("리소스명과 ID로 생성", () => {
    const exception = new NotFoundException("Content", 123);

    expect(exception.message).toBe("Content(id: 123)을(를) 찾을 수 없습니다.");
  });

  it("문자열 ID 지원", () => {
    const exception = new NotFoundException("User", "abc-123");

    expect(exception.message).toBe("User(id: abc-123)을(를) 찾을 수 없습니다.");
  });
});

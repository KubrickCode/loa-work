import { ValidationException } from "./validation.exception";

describe("ValidationException", () => {
  it("기본 메시지와 VALIDATION_ERROR 코드 포함", () => {
    const exception = new ValidationException("잘못된 입력입니다.");

    expect(exception.message).toBe("잘못된 입력입니다.");
    expect(exception.code).toBe("VALIDATION_ERROR");
    expect(exception.extensions?.code).toBe("VALIDATION_ERROR");
  });

  it("필드 정보 포함", () => {
    const exception = new ValidationException("초는 60초 미만이어야 합니다.", "seconds");

    expect(exception.message).toBe("초는 60초 미만이어야 합니다.");
    expect(exception.extensions?.field).toBe("seconds");
  });

  it("필드 없이 생성 가능", () => {
    const exception = new ValidationException("유효하지 않은 값입니다.");

    expect(exception.extensions?.field).toBeUndefined();
  });
});

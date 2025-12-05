import { GraphQLFormattedError } from "graphql";
import { ClsServiceManager } from "nestjs-cls";
import { Mock, vi } from "vitest";

import { ERROR_CODES } from "../exception";
import { formatGraphQLError } from "./graphql-format-error";

vi.mock("nestjs-cls", () => ({
  ClsServiceManager: {
    getClsService: vi.fn(),
  },
}));

describe("formatGraphQLError", () => {
  const mockClsService = {
    getId: vi.fn().mockReturnValue("test-correlation-id"),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (ClsServiceManager.getClsService as Mock).mockReturnValue(mockClsService);
    delete process.env.NODE_ENV;
  });

  it("모든 에러에 correlationId 추가", () => {
    const formattedError: GraphQLFormattedError = {
      extensions: { code: "VALIDATION_ERROR", field: "field" },
      message: "잘못된 입력",
    };

    const result = formatGraphQLError(formattedError);

    expect(result.extensions?.correlationId).toBe("test-correlation-id");
    expect(result.extensions?.code).toBe("VALIDATION_ERROR");
    expect(result.message).toBe("잘못된 입력");
  });

  it("프로덕션에서 INTERNAL_SERVER_ERROR는 마스킹", () => {
    process.env.NODE_ENV = "production";
    const formattedError: GraphQLFormattedError = {
      extensions: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        stacktrace: ["sensitive"],
      },
      message: "Sensitive error details",
    };

    const result = formatGraphQLError(formattedError);

    expect(result.message).toBe("Internal server error");
    expect(result.extensions?.correlationId).toBe("test-correlation-id");
    expect(result.extensions?.stacktrace).toBeUndefined();
  });

  it("개발 환경에서 INTERNAL_SERVER_ERROR는 그대로 노출", () => {
    process.env.NODE_ENV = "development";
    const formattedError: GraphQLFormattedError = {
      extensions: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        stacktrace: ["trace"],
      },
      message: "Detailed error",
    };

    const result = formatGraphQLError(formattedError);

    expect(result.message).toBe("Detailed error");
    expect(result.extensions?.stacktrace).toEqual(["trace"]);
    expect(result.extensions?.correlationId).toBe("test-correlation-id");
  });

  it("CLS 서비스 없을 때 correlationId는 undefined", () => {
    (ClsServiceManager.getClsService as Mock).mockReturnValue(undefined);
    const formattedError: GraphQLFormattedError = {
      extensions: { code: "SOME_ERROR" },
      message: "Error",
    };

    const result = formatGraphQLError(formattedError);

    expect(result.extensions?.correlationId).toBeUndefined();
  });
});

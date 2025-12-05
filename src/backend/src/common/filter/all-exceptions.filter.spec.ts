import { ArgumentsHost, HttpStatus, NotFoundException } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { Mock, vi } from "vitest";

import { NotFoundException as CustomNotFoundException } from "../exception";
import { AllExceptionsFilter } from "./all-exceptions.filter";

describe("AllExceptionsFilter", () => {
  let filter: AllExceptionsFilter;
  let mockClsService: { getId: Mock };
  let mockResponse: {
    json: Mock;
    status: Mock;
  };
  let mockRequest: {
    method: string;
    url: string;
  };
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    mockClsService = {
      getId: vi.fn().mockReturnValue("test-correlation-id"),
    };
    filter = new AllExceptionsFilter(mockClsService as unknown as ClsService);
    mockResponse = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };
    mockRequest = {
      method: "GET",
      url: "/api/test",
    };
    mockHost = {
      getType: vi.fn().mockReturnValue("http"),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: () => mockRequest,
        getResponse: () => mockResponse,
      }),
    } as unknown as ArgumentsHost;
  });

  it("GraphQL 요청은 re-throw", () => {
    const graphqlHost = {
      getType: vi.fn().mockReturnValue("graphql"),
    } as unknown as ArgumentsHost;
    const exception = new Error("Test error");

    expect(() => filter.catch(exception, graphqlHost)).toThrow(exception);
  });

  it("HttpException 처리", () => {
    const exception = new NotFoundException("리소스를 찾을 수 없습니다.");

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: "test-correlation-id",
        error: "NOT_FOUND",
        message: "리소스를 찾을 수 없습니다.",
        path: "/api/test",
        statusCode: 404,
      })
    );
  });

  it("일반 Error 처리", () => {
    const exception = new Error("Something went wrong");

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: "test-correlation-id",
        error: "INTERNAL_SERVER_ERROR",
        statusCode: 500,
      })
    );
  });

  it("알 수 없는 타입 처리", () => {
    filter.catch("unknown error", mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: "test-correlation-id",
        error: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
        statusCode: 500,
      })
    );
  });

  it("correlationId 포함 확인", () => {
    const exception = new Error("Test error");

    filter.catch(exception, mockHost);

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: "test-correlation-id",
        timestamp: expect.any(String),
      })
    );
  });

  it("BaseGraphQLException 처리 - NOT_FOUND", () => {
    const exception = new CustomNotFoundException("Content", "123");

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: "test-correlation-id",
        error: "NOT_FOUND",
        message: "Content(id: 123)을(를) 찾을 수 없습니다.",
        statusCode: 404,
      })
    );
  });
});

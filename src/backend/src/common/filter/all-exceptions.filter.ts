import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { GqlContextType } from "@nestjs/graphql";
import { Request, Response } from "express";
import { ClsService } from "nestjs-cls";

import { NODE_ENV } from "../constants/env.constants";
import { BaseGraphQLException, ERROR_CODES, ErrorCode } from "../exception";
import { ErrorResponse } from "./types";

@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly codeToStatusMap: Record<ErrorCode, HttpStatus> = {
    [ERROR_CODES.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
    [ERROR_CODES.FORBIDDEN]: HttpStatus.FORBIDDEN,
    [ERROR_CODES.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
    [ERROR_CODES.NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ERROR_CODES.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
    [ERROR_CODES.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
  };

  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly cls: ClsService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    if (host.getType<GqlContextType>() === "graphql") {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const correlationId = this.cls.getId();
    const isProduction = process.env.NODE_ENV === NODE_ENV.PRODUCTION;

    let message = "Internal server error";
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof BaseGraphQLException) {
      status = this.codeToStatusMap[exception.code] ?? HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      message = exception.message;
      status = exception.getStatus();
    } else if (exception instanceof Error) {
      this.logger.error(
        `[${correlationId}] Unhandled exception: ${exception.message}`,
        exception.stack
      );
      message = isProduction ? "Internal server error" : exception.message;
    } else {
      this.logger.error(`[${correlationId}] Unknown exception type: ${String(exception)}`);
    }

    const errorResponse: ErrorResponse = {
      correlationId,
      error: HttpStatus[status] || "Unknown Error",
      message,
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}

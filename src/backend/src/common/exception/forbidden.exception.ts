import { BaseGraphQLException, ERROR_CODES } from "./base.exception";

export class ForbiddenException extends BaseGraphQLException {
  constructor(message = "접근 권한이 없습니다.") {
    super(message, ERROR_CODES.FORBIDDEN);
  }
}

import { BaseGraphQLException, ERROR_CODES } from "./base.exception";

export class UnauthorizedException extends BaseGraphQLException {
  constructor(message = "인증이 필요합니다.") {
    super(message, ERROR_CODES.UNAUTHORIZED);
  }
}

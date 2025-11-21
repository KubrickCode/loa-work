import { BaseGraphQLException, ERROR_CODES } from "./base.exception";

export class ValidationException extends BaseGraphQLException {
  constructor(message: string, field?: string) {
    super(message, ERROR_CODES.VALIDATION_ERROR, { field });
  }
}

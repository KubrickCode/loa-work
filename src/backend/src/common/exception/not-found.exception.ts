import { BaseGraphQLException, ERROR_CODES } from "./base.exception";

export class NotFoundException extends BaseGraphQLException {
  constructor(resource: string, id?: number | string) {
    const message = id
      ? `${resource}(id: ${id})을(를) 찾을 수 없습니다.`
      : `${resource}을(를) 찾을 수 없습니다.`;
    super(message, ERROR_CODES.NOT_FOUND);
  }
}

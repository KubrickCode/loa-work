import { GraphQLError, GraphQLErrorOptions } from "graphql";

export const ERROR_CODES = {
  BAD_REQUEST: "BAD_REQUEST",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type ErrorExtensions = {
  code: ErrorCode;
  details?: Record<string, unknown>;
  field?: string;
};

export abstract class BaseGraphQLException extends GraphQLError {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    extensions?: Omit<ErrorExtensions, "code">
  ) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code,
        ...extensions,
      },
    };
    super(message, options);
  }
}

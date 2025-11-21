import { GraphQLFormattedError } from "graphql";
import { ClsServiceManager } from "nestjs-cls";

import { NODE_ENV } from "../constants/env.constants";
import { ERROR_CODES } from "../exception";

export const formatGraphQLError = (
  formattedError: GraphQLFormattedError
): GraphQLFormattedError => {
  const cls = ClsServiceManager.getClsService();
  const correlationId = cls?.getId();
  const isProduction = process.env.NODE_ENV === NODE_ENV.PRODUCTION;

  const code = formattedError.extensions?.code;

  if (isProduction && code === ERROR_CODES.INTERNAL_SERVER_ERROR) {
    return {
      extensions: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        correlationId,
      },
      message: "Internal server error",
    };
  }

  return {
    ...formattedError,
    extensions: {
      ...formattedError.extensions,
      correlationId,
    },
  };
};

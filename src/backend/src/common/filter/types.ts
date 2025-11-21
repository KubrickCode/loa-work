export type ErrorResponse = {
  correlationId?: string;
  error: string;
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
};

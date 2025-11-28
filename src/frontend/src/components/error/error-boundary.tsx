import { PropsWithChildren } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export const ErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <ReactErrorBoundary fallbackRender={({ error }) => <>{error.message}</>}>
      {children}
    </ReactErrorBoundary>
  );
};

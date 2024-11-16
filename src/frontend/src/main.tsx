import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "~/core/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

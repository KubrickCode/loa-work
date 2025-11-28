import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "~/libs/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

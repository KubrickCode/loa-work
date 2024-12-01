import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      "^/(auth/.*|graphql)": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});

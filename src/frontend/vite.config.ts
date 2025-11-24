import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "./build",
  },
  plugins: [react(), viteTsconfigPaths()],
  server: {
    host: true,
    open: !process.env.PLAYWRIGHT,
    port: 3000,
    proxy: {
      "^/(auth/.*|graphql|api/.*)": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});

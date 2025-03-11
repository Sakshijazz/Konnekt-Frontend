import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    proxy: {
      // Proxy API calls to the Spring Boot backend
      "/api": {
        target: "http://localhost:8080",   // Backend API URL
        changeOrigin: true,                // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''),  // Rewrite the /api prefix if needed
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

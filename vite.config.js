import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths(), EnvironmentPlugin("all")],
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ["process"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});

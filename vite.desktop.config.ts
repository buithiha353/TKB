import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "desktop",
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
  define: {
    "import.meta.env.VITE_DESKTOP": JSON.stringify("true"),
  },
  server: {
    port: 1420,
    strictPort: true,
  },
  build: {
    outDir: "../dist-desktop",
    emptyOutDir: true,
  },
});

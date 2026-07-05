import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";

type NitroVercelConfig = {
  nitro: {
    preset: "vercel";
    output: {
      dir: string;
    };
  };
};

const config = {
  plugins: [
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  nitro: {
    preset: "vercel",
    output: {
      dir: ".vercel/output",
    },
  },
} satisfies UserConfig & NitroVercelConfig;

export default defineConfig(config);

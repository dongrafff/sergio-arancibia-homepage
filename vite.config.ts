import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // base relativo + outDir docs/: GitHub Pages (deploy from branch) solo permite path / o /docs
  base: "./",
  build: { outDir: "docs" },
  plugins: [react(), tailwindcss()],
});

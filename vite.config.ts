import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

// vite limpia docs/ en cada build y borra .nojekyll (necesario para GitHub Pages)
function nojekyllPlugin(outDir: string): Plugin {
  return {
    name: "write-nojekyll",
    closeBundle() {
      fs.writeFileSync(path.resolve(__dirname, outDir, ".nojekyll"), "");
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // base relativo + outDir docs/: GitHub Pages (deploy from branch) solo permite path / o /docs
  base: "./",
  build: { outDir: "docs" },
  plugins: [react(), tailwindcss(), nojekyllPlugin("docs")],
});

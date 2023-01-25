import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@themes": path.join(__dirname, "src", "themes"),
      "@components": path.join(__dirname, "src", "components"),
      "@contexts": path.join(__dirname, "src", "contexts"),
      "@hoc": path.join(__dirname, "src", "hoc"),
      "@pages": path.join(__dirname, "src", "pages"),
      "@services": path.join(__dirname, "src", "services"),
      "@hooks": path.join(__dirname, "src", "hooks"),
    },
  },
});

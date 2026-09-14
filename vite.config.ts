import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base: "/" works for a user site (sushmitha047.github.io) and for Vercel/Netlify.
// If you deploy to a PROJECT page instead (github.com/sushmitha047/portfolio),
// change this to "/portfolio/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});

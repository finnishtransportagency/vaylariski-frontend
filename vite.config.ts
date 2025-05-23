import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  appType: 'custom',
  base: '/',
  define: {
    'import.meta.env.REACT_APP_BASE_REST_URL': JSON.stringify(process.env.REACT_APP_BASE_REST_URL),
    'import.meta.env.PROXY_URL': JSON.stringify(process.env.PROXY_URL),
  },
});
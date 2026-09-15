import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  // Optional: run the local frontend against a deployed backend without
  // touching its CORS config, e.g. VITE_DEV_PROXY_TARGET=https://my-api.onrender.com
  const proxyTarget = env.VITE_DEV_PROXY_TARGET;

  const withOrigin = (proxy) => {
    proxy.on("proxyReq", (proxyReq) => {
      if (!env.VITE_DEV_PROXY_ORIGIN) return;
      proxyReq.setHeader("origin", env.VITE_DEV_PROXY_ORIGIN);
      proxyReq.setHeader("referer", `${env.VITE_DEV_PROXY_ORIGIN}/`);
    });
  };

  return {
    plugins: [react()],
    server: proxyTarget
      ? {
          proxy: {
            "/api": { target: proxyTarget, changeOrigin: true, secure: true, configure: withOrigin },
            "/socket.io": { target: proxyTarget, changeOrigin: true, secure: true, ws: true, configure: withOrigin },
          },
        }
      : undefined,
  };
});

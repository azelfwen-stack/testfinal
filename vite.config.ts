import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// 解决 __dirname 在 ESModule 中的兼容问题（Vite 默认是 ESModule）
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 核心配置：解决静态资源路径 404
    // 方案1（推荐新手）：相对路径，适配所有部署场景
    base: './', 
    // 方案2：若部署在子目录（如 /testfinal/），则写：base: '/testfinal/'
    // 方案3：若部署在根目录，写：base: '/'

    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'), // 建议改为 src 目录：path.resolve(__dirname, 'src')
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      cors: true,
      allowedHosts: [
        'syenitic-lakisha-monobasic.ngrok-free.dev',
        'localhost',
        '127.0.0.1',
        '192.168.0.219'
      ],
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    // 可选：明确打包输出目录（默认就是 dist，可省略）
    build: {
      outDir: 'dist',
      assetsDir: 'assets', // 静态资源统一放在 dist/assets 下，方便管理
    },
  };
});
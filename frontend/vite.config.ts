import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), svgr()],
    server: {
        proxy: {
            '/api': {
                target: 'https://api.channeling.it.com', // 실제 백엔드 주소
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false, // https 인증서 무시 (개발환경용)
                ws: true,
            },
        },
    },
})

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    build: {
        outDir: 'build',
        sourcemap: true,
    },
    server: {
        port: 3000,
        open: true,
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                exportType: 'named',
                ref: true,
                svgo: true,
                titleProp: true,
            },
            include: '**/*.svg',
        }),
        sentryVitePlugin({
            org: 'matesero',
            project: 'javascript-react',
        }),
    ],
    optimizeDeps: {
        include: ['@mui/material', '@mui/x-date-pickers'],
    },
});

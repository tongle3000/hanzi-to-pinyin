const Path = require('path');
const vuePlugin = require('@vitejs/plugin-vue')
import Components from 'unplugin-vue-components/vite'
const { defineConfig } = require('vite');

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
    root: Path.join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [
        vuePlugin(),
        Components({ /* options */ }),
    ],
});

module.exports = config;

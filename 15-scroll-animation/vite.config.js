import react from '@vitejs/plugin-react'
import vitePluginCompress from 'vite-plugin-compression'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    plugins:
    [
        react(),
        vitePluginCompress(),
    ],
    root: 'src/',
    publicDir: "../public/",
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../docs',
        emptyOutDir: true,
        sourcemap: false
    }
}
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), svgr()],
    base: '/',

    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      historyApiFallback: true,
      strictPort: true,
      port: 8080,
      open: true,
      host: true,
    },

    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
            output: {
                manualChunks(id) {
                if (id.includes('node_modules') && id.includes('@mui')) {
                    return 'vendor-mui';
                }
                if (id.includes('node_modules')) {
                    return 'vendor';
                }
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },

    css: {
      modules: {
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
      },
      postcss: {
        plugins: [
          require('autoprefixer'),
          ...(mode === 'production'
            ? [require('cssnano')({ preset: 'default' })]
            : []),
        ],
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});

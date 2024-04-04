import { resolve, relative } from 'path';
import { defineConfig } from 'vite'
import bambuserBamUIPlugin from '@bambuser/vite-plugin-bam-ui';
import bambuserAppDevEnvPlugin from '@bambuser/vite-plugin-bam-app-dev-env';
import bambuserAppRuntimePlugin from '@bambuser/vite-plugin-bam-app-runtime';

export default defineConfig(() => {
  return {
    base: './',
    build: {
      target: 'es2022',
      rollupOptions: {
        input: [
          resolve(__dirname, 'main.js'),
          resolve(__dirname, 'view/dropInScreen/dropInScreen.html'),
          resolve(__dirname, 'view/thankYouScreen/thankYouScreen.html'),
          resolve(__dirname, 'view/postThankYouScreen/postThankYouScreen.html'),
        ],
        output: {
          entryFileNames: (chunkInfo) => {
            return relative(process.cwd(), chunkInfo.facadeModuleId.replace('.html', '.js'));
          },
        },
      },
    },
    plugins: [
      bambuserAppDevEnvPlugin(),
      bambuserAppRuntimePlugin(),
      bambuserBamUIPlugin(),
    ],
    server: {
      port: '5173',
      open: '/devenv/?screen=pre-call',
    },
  };
});

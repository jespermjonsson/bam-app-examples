import { relative, resolve } from 'path'
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
        input: {
          main: resolve(__dirname, 'main.js'),
          dropInScreen: resolve(__dirname, 'view/dropInScreen/dropInScreen.html'),
          customDialog: resolve(__dirname, 'view/customDialog/customDialog.html'),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            return relative(__dirname, chunkInfo.facadeModuleId.replace('.html', '.js'));
          }
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
      open: '/devenv/',
    },
  };
});

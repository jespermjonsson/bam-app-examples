import { relative, resolve } from 'path';
import { defineConfig } from 'vite'
import bambuserBamUIPlugin from '@bambuser/vite-plugin-bam-ui';
import bambuserAppDevEnvPlugin from '@bambuser/vite-plugin-bam-app-dev-env';
import bambuserAppRuntimePlugin from '@bambuser/vite-plugin-bam-app-runtime';

export default defineConfig(() => {
  return {
    build: {
      target: 'es2022',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'main.js'),
          consentDialog: resolve(__dirname, 'view/consentDialog/consentDialog.html'),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.isEntry && chunkInfo.name === 'main') return 'main.js';
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
      open: '/devenv/?orgId=vto-enabled-org-id-here',
    },
  };
});

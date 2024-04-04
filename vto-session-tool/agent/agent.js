export default async appContext => {
  console.log('VTO APP: HELLO FROM AGENT', appContext);

  let vtoTool;
  appContext.toolApi.on('provide-instance', async ({ id }) => {
    if (id === 'my-custom-vto-session-tool') {
      vtoTool = await appContext.toolApi.createTool({
        id,
        label: 'Snowy',
        icon: 'tryOn',
        viewUrl: new URL('../view/vtoTool/vtoTool.html', new URL(import.meta.url)).href,
      });
      return vtoTool;
    }
  });

  appContext.virtualTryOnApi.on('apply', ({ items }) => {
    console.info('VTO APP: apply', items);
    if (items.length) vtoTool.open();
  });
};

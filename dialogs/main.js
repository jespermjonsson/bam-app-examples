const { screenApi } = await bambuserAppFramework.getContext();

// Provide a drop-in screen that will be the view for this example
screenApi.on('provide-instance', async ({ id }) => {
  return await screenApi.createScreen({
    id,
    viewUrl: new URL('./view/dropInScreen/dropInScreen.html', new URL(import.meta.url)).href,
  });
});

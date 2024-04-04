const appContext = await bambuserAppFramework.getContext();

console.log('CUSTOM SCREENS APP: MAIN', appContext);
const { screenApi } = appContext;

// 1. Listen to event when screens need to be created
screenApi.on('provide-instance', async ({ id }) => {

  // 2. Determine url for screen to be shown
  const viewUrl = (() => {
    if (id === 'my-custom-drop-in-screen')
      return new URL('./view/dropInScreen/dropInScreen.html', new URL(import.meta.url)).href;
    else if (id === 'my-custom-pre-media-permissions-screen')
      return new URL('./view/preMediaPermissionsScreen/preMediaPermissionsScreen.html', new URL(import.meta.url)).href;
    else if (id === 'my-custom-thank-you-screen')
      return new URL('./view/thankYouScreen/thankYouScreen.html', new URL(import.meta.url)).href;
    else if (id === 'my-custom-post-thank-you-screen')
      return new URL('./view/postThankYouScreen/postThankYouScreen.html', new URL(import.meta.url)).href;
  })();

  // 3. Create the screen instance
  const screen = await screenApi.createScreen({
    id,
    viewUrl,
  });

  // 4. Setup any communication with screen
  screen.on('message', payload => {
    console.log(`CUSTOM SCREENS APP: MAIN received message from screen ${id}`, payload);
    if (payload.eventType === 'hello') {
      screen.postMessage({
        eventType: 'reply',
        data: {
          replyFor: payload.eventType,
        },
      });
    }
  });

  // 5. Setup open/close listeners
  screen.on('open', (data) => {
    console.log(`CUSTOM SCREENS APP: MAIN open event for screen ${id}`);
  });
  screen.on('close', (data) => {
    console.log(`CUSTOM SCREENS APP: MAIN close event for screen ${id}`, data);
  });

  // 6. Return the screen instance so it can be presented
  return screen;

});

console.log('CUSTOM CONSET DIALOG: MAIN');

const { dialogApi } = await bambuserAppFramework.getContext();

// Listen to event when dialog instance need to be created
dialogApi.on('provide-instance', async ({ id }) => {

  if (id === 'my-custom-consent-dialog') {
    console.log('CUSTOM CONSET DIALOG: MAIN create dialog instance');

    // Create custom dialog instance and provide the view url to be shown
    const customConsentDialog = await dialogApi.createCustomDialog({
      id,
      viewUrl: new URL('./view/consentDialog/consentDialog.html', new URL(import.meta.url)).href,
    });

    // Setup event listeners
    customConsentDialog.on('open', () => {
      console.log('CUSTOM CONSET DIALOG: MAIN open event');
    });
    customConsentDialog.on('close', (event) => {
      console.log('CUSTOM CONSET DIALOG: MAIN close event', event);
    });
    customConsentDialog.on('message', (payload) => {
      console.log('CUSTOM CONSET DIALOG: MAIN message event', payload);
      customConsentDialog.postMessage({
        eventType: 'reply',
        data: {
          replyTo: payload.eventType,
        },
      });
    });

    // Finally return the resolved dialog instance
    return customConsentDialog;
  }

});

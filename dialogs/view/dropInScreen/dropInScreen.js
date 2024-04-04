
const { screen, dialogApi } = await bambuserAppFramework.getContext();

// Create custom dialog with view provided by app
const customDialog = await dialogApi.createCustomDialog({
  id: 'my-custom-dialog',
  viewUrl: new URL('../customDialog/customDialog.html', new URL(import.meta.url)).href,
});

// Setup custom dialog event listeners
customDialog.on('open', () => {
  console.log('Custom dialog app: custom dialog open')
});
customDialog.on('close', event => {
  console.log('Custom dialog app: custom dialog close', event)
});
customDialog.on('message', event => {
  console.log('Custom dialog app: custom dialog message', event);
});

// Setup button click handler to open custom dialog
document.querySelector('#openCustomDialog')
  .addEventListener('click', async () => {
    // Open dialog and wait for close result
    const result = await customDialog.open();
    console.log('Custom dialog app: custom dialog result', result);
    document.querySelector('#dialog-result').innerText = `Dialog result:\n${JSON.stringify(result, null, 2)}`;
  });

// Setup button click handler to open message dialog
document.querySelector('#openMessageDialog')
  .addEventListener('click', async () => {
    const result = await dialogApi.openMessageDialog({
      title: 'Current date and time',
      content: new Date(),
    });
    console.log('Custom dialog app: message dialog result', result);
    document.querySelector('#dialog-result').innerText = `Dialog result:\n${JSON.stringify(result, null, 2)}`;
  });

// Setup button click handler to open confirm dialog
document.querySelector('#openConfirmDialog')
  .addEventListener('click', async () => {
    const result = await dialogApi.openConfirmDialog({
      title: 'Bacon ipsum',
      content: `Tri-tip salami burgdoggen turkey, leberkas brisket beef?`,
      buttonTitle: 'Yes',
      cancelButtonTitle: 'No',
    });
    console.log('Custom dialog app: message dialog result', result);
    document.querySelector('#dialog-result').innerText = `Dialog result:\n${JSON.stringify(result, null, 2)}`;
  });

// Show screen directly
screen.setReady();

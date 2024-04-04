console.log('CUSTOM CONSET DIALOG: DIALOG FRAME');

const { dialog } = await bambuserAppFramework.getContext();

// Setup click handlers for closing the dialog
document.querySelector('#accept').addEventListener('click', () => {
  dialog.close({ action: 'confirm' });
});
document.querySelector('#deny').addEventListener('click', () => {
  dialog.close({ action: 'dismiss' });
});

// Show dialog content directly upon load
dialog.setReady();

// Example of setting up bi-directional communication with main app context
dialog.on('message', payload => {
  console.log('CUSTOM CONSET DIALOG: DIALOG FRAME message event', payload);
});
dialog.emit({
  eventType: 'hello',
  data: {
    foo: 'bar',
  },
});

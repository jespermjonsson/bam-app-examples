const appContext = await bambuserAppFramework.getContext();

console.log('CUSTOM SCREENS APP: PRE-MEDIA-PERMISSIONS SCREEN', appContext);
const { screen } = appContext;

// 1. Show screen directly
screen.setReady();

// 2. Setup click handlers to allow user to move futher
const continueBtn = document.querySelector('#continueBtn');
continueBtn.addEventListener('click', () => {
  screen.emit({
    eventType: 'shopper-data',
    data: {
      firstName: document.querySelector('input[name="first-name"]').value,
      lastName: document.querySelector('input[name="last-name"]').value,
      email: document.querySelector('input[name="email"]').value,
    },
  });
  screen.close({ action: 'next' });
});

// 3. Setup communication with main app context
screen.on('message', payload => {
  console.log('CUSTOM SCREENS APP: PRE-MEDIA-PERMISSIONS SCREEN received message', payload);
});

// 4. Demo, demo, demo, post message to main app context
window.setTimeout(() => {
  console.log('CUSTOM SCREENS APP: PRE-MEDIA-PERMISSIONS SCREEN time to send a demo message to main app context!');
  screen.postMessage({
    eventType: 'hello',
    data: {
      time: `${new Date()}`,
    },
  });
}, 5000);

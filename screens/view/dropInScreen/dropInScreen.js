const appContext = await bambuserAppFramework.getContext();

console.log('CUSTOM SCREENS APP: DROP-IN SCREEN', appContext);
const { screen } = appContext;

// 1. Show screen directly
screen.setReady();

// 2. Setup click handlers to allow user to move futher
const acceptTermsCheckbox = document.querySelector('input[name="accept-terms"]')
const enterQueueButton = document.querySelector('#enterQueue');
const makeAppointmentButton = document.querySelector('#makeAppointment');

acceptTermsCheckbox.addEventListener('change', () => {
  enterQueueButton.disabled = !acceptTermsCheckbox.checked;
  makeAppointmentButton.disabled = !acceptTermsCheckbox.checked;
});
enterQueueButton.addEventListener('click', () => {
  screen.close({ action: 'next' });
});
makeAppointmentButton.addEventListener('click', () => {
  screen.close({ action: 'book' });
});

// 3. Setup communication with main app context
screen.on('message', payload => {
  console.log('CUSTOM SCREENS APP: DROP-IN SCREEN received message', payload);
});

// 4. Demo, demo, demo, post message to main app context
window.setTimeout(() => {
  console.log('CUSTOM SCREENS APP: DROP-IN SCREEN time to send a demo message to main app context!');
  screen.postMessage({
    eventType: 'hello',
    data: {
      time: `${new Date()}`,
    },
  });
}, 5000);

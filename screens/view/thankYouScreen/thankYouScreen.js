const appContext = await bambuserAppFramework.getContext();

console.log('CUSTOM SCREENS APP: THANK YOU SCREEN', appContext);
const { screen } = appContext;

// 1. Show screen directly
screen.setReady();

// 2. Setup click handlers to allow user to move futher
document.querySelector('#cta').addEventListener('click', () => {
  screen.close({ action: 'next' });
});

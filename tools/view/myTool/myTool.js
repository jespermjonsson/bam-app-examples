console.log('TOOL APP: TOOL VIEW');

const { tool, hostId } = await bambuserAppFramework.getContext();

// Add event listener for communication with main app context
tool.on('message', payload => {
  console.log('TOOL APP: TOOL VIEW received message', payload, hostId);
});


// Setup click handler for sending example message to main app context
const clickMeButton = document.querySelector('#click-me')
clickMeButton.addEventListener('click', () => {
  document.querySelector('#clicked-message').style.display = '';
  tool.emit({
    eventType: 'hello',
    data: {
      time: `${new Date()}`,
    },
  });
});


// Mark tool view as ready to be shown
tool.setReady();

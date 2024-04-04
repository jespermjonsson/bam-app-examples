console.log('TOOL APP: MAIN');

const { toolApi, hostId } = await bambuserAppFramework.getContext();

// Add the tool, will appear as "My tool" in "..." menu located at bottom right corner during a call
const tool = await toolApi.addTool({
  label: 'My tool',
  iconUrl: new URL('./assets/info-icon.svg', import.meta.url).href,
  viewUrl: new URL('./view/myTool/myTool.html', new URL(import.meta.url)).href,
});


// Setup event listeners
tool.on('open', () => {
  console.log('TOOL APP: MAIN tool open event', hostId);
});
tool.on('close', () => {
  console.log('TOOL APP: MAIN tool close event', hostId);
});
tool.on('message', payload => {
  console.log('TOOL APP: MAIN tool message event', payload, hostId);

  // Example of sending a message to tool view context
  tool.postMessage({
    eventType: 'reply',
    data: {
      replyFor: payload.eventType,
    },
  });
});

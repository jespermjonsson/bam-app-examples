const appContext = await bambuserAppFramework.getContext();
const hostImpl = appContext.hostId === 'callsAgentTool' ? await import('./agent/agent.js') : await import('./shopper/shopper.js');
hostImpl.default(appContext);

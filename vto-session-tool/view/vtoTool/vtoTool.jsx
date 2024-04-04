import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'

onBambuserAppContextReady(async appContext => {
  console.log(`VTO APP: HELLO FROM ${appContext.hostId === 'callsWidget' ? 'SHOPPER' : 'AGENT'} VTO TOOL`, appContext);

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App appFrameworkContext={appContext} />
    </React.StrictMode>,
  );
});

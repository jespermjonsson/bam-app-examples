import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';

const ToolView = ({ appContext }) => {
  const { tool, hostId } = appContext;
  const [btnClicked, setBtnClicked] = useState(false);

  useEffect(() => {
    // Mark tool view as ready to be shown
    tool.setReady();

    // Add event listener for communication with main app context
    const listener = (payload) => {
      console.log('TOOL APP: TOOL VIEW received message', payload, hostId);
    };
    tool.on('message', listener);
    return () => {
      tool.off('message', listener);
    }
  }, [tool, hostId]);

  const onBtnClick = () => {
    setBtnClicked(true);

    // Example emitting a message to main app context
    tool.emit({
      eventType: 'hello',
      data: {
        time: `${new Date()}`,
      },
    });
  };

  return (
    <div className="bam-container">
      {hostId === 'showsPlayer' && (
        <p>This is a custom tool view for shopper in Bambuser One-to-Many</p>
      )}
      {hostId === 'callsWidget' && (
        <p>This is a custom tool view for shopper in Bambuser One-to-One</p>
      )}
      {hostId === 'callsAgentTool' && (
        <p>This is a custom tool view for agent in Bambuser One-to-One</p>
      )}
      <button data-variant="primary" data-size="large-wide" onClick={onBtnClick}>Click me!</button>
      {btnClicked && <p>Look in dev tools console for messages sent between tool and main app context</p>}
      <p>Edit in <b>view/myTool/myTool.jsx</b> 🚧</p>
    </div>
  );
};


const appContext = await bambuserAppFramework.getContext();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToolView appContext={appContext} />
  </React.StrictMode>,
);

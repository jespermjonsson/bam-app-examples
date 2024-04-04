export default {
  "appManifest": {
    "permissions": [
      "callsWidget:host.run",
      "callsWidget:virtualTryOnProvider.write",
      "callsWidget:virtualTryOn.write",
      "callsWidget:tool.write",
      "callsAgentTool:host.run",
      "callsAgentTool:virtualTryOn.write",
      "callsAgentTool:tool.write"
    ],
    "src": {
      "type": "module",
      "url": "http://localhost:5173/main.js"
    },
    "tools": {
      "callsWidget": [{
        "id": "my-custom-vto-session-tool",
        "type": "vto-session"
      }],
      "callsAgentTool": [{
        "id": "my-custom-vto-session-tool",
        "type": "vto-session"
      }]
    }
  },
  "appConfig": {}
};

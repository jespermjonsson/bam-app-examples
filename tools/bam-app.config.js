export default {
  "appManifest": {
    "permissions": [
      "callsWidget:host.run",
      "callsWidget:tool.write",
      "callsAgentTool:host.run",
      "callsAgentTool:tool.write"
    ],
    "src": {
      "type": "module",
      "url": "http://localhost:5173/main.js"
    }
  },
  "appConfig": {}
};

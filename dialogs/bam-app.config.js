export default {
  "appManifest": {
    "permissions": [
      "callsWidget:host.run",
      "callsWidget:screen.write",
      "callsWidget:dialog.write"
    ],
    "src": {
      "type": "module",
      "url": "http://localhost:5173/main.js"
    },
    "screens": {
      "callsWidget": [{
        "id": "my-custom-start-screen",
        "slot": "drop-in"
      }]
    }
  },
  "appConfig": {}
};

export default {
  "appManifest": {
    "permissions": [
      "callsWidget:host.run",
      "callsWidget:dialog.write"
    ],
    "src": {
      "type": "module",
      "url": "http://localhost:5173/main.js"
    },
    "dialogs": {
      "callsWidget": [{
        "id": "my-custom-consent-dialog",
        "type": "vto-consent"
      }]
    }
  },
  "appConfig": {}
};

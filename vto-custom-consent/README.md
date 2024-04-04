# Virtual Try-on custom consent dialog

Example to showcase how to replace the VTO consent dialog.


Requirements:
* An organization configured to use virtual try-on and to show consent dialog before starting the vto session

## Trying it out

Start local dev server:

```
npm install
npm run dev
```

Follow these steps to see the example in action:

1. Open http://localhost:5173/devenv/?orgId=vto-enabled-org-id-here if it wasn't automatically opened when starting the dev env
2. Switch to 1:1 Agent Tool
3. Open the try-on session tool
4. Press button to request consent
5. Switch to 1:1 Call Widget
6. The custom Virtual try-on consent dialog should be shown

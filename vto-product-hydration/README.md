# Virtual Try-on data via product hydration

Example of providing virtual try-on data via product hydration instead of asking app for such data


## Trying it out

Start local dev server:

```
npm install
npm run dev
```

Follow these steps to see the example in action:

1. Open http://localhost:5173/devenv/?callsWidgetSandboxBaseUrl=http://localhost:5173/sandbox.html if it wasn't automatically opened when starting the dev env
2. Activate shopper camera
3. Select 1:1 Agent Tool in top right corner
4. Search for product “1” or "2"
5. Enable product for try-on
6. The product should instantly be added to VTO session as data was already provided
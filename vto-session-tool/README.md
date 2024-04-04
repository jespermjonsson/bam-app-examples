# Custom virtual try-on tool example

Example of replacing built in Virtual try-on session tool with custom UI on both agent and shopper side. This examples builds the VTO session tool UI with the help of React. It also adds an example VTO provider to enable the vto capabilities, this is not a reqirement and can be provided by another app or the Bambuser built-in VTO capabilities.

## Trying it out

Start local dev server:

```
npm install
npm run dev
```

Follow these steps to see the example in action:

1. Open http://localhost:5173/devenv/ if it wasn't automatically opened when starting the dev env
2. In bottom right corner, press “…” menu and “Snowy” menu item, this is the custom VTO tool on shopper side
3. Activate shopper camera
4. Select 1:1 Agent Tool in top right corner
5. Search for product “Moisture Miracle Lipstick” or “Black Magic Mascara”
6. Enable either or both products for try-on
7. The products will be rendered in the custom VTO tool iframe on both sides
8. Use controls to change colors, patterns, stop trying one product, or remove products. All actions and UI is synched between agent and shopper side.
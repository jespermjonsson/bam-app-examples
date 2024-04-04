# Virtual try-on with imaginary snowflake provider

Example implementing the required Virtual try-on provider parts adding virtual snowflakes onto shopper (instead of ex. makeup)

## Trying it out

Start local dev server:

```
npm install
npm run dev
```

Follow these steps to see the example in action:

1. Open http://localhost:5173/devenv/ if it wasn't automatically opened when starting the dev env
2. Activate shopper camera
3. Select 1:1 Agent Tool in top right corner
4. Search for product “Moisture Miracle Lipstick” and click "Try-on" button
5. The product should be added to VTO session and snowflakes should start falling
6. Use the VTO tool to change colors and patterns
7. Search for the second supported product "Black Magic Mascara" and click "Try-on" button
8. Two colors of snowflakes should now be falling down (one type for each product)
9. Use the VTO tool to change colors, patterns and enable / disable products


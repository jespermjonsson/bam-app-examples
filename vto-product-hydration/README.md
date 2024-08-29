# Selective virtual try-on data via product hydration

Example of providing selective virtual try-on data via product hydration instead of asking app for such data. This can be used to for example disable any product for VTO directly from product hydartion level and ensure app will never be asked about such product as it has already been marked as disabled for VTO. It is important that vendorId used in product hydration matches the vendorId registered by the VTO app.

Limitation: Currently all variants of the product will be disabled for VTO when using this solution.

## Trying it out

### Get the code

```
git clone git@github.com:jespermjonsson/bam-app-examples.git
cd bam-app-examples/
git checkout restrict-vto-products-via-ph
cd vto-product-hydration
```

The sandbox.html contains code for merchant site and main.js contains code for the app created by VTO vendor.

### Start local dev server

Its recommended to use Node.JS 20+

```
npm install
npm run dev
```

### Follow these steps to see the example in action

1. Open http://localhost:5173/devenv/?callsWidgetSandboxBaseUrl=http://localhost:5173/sandbox.html if it wasn't automatically opened when starting the dev env
2. Activate shopper camera
3. Select 1:1 Agent Tool in top right corner
4. Search for product “1” or "2"
5. The VTO app will not be asked to provide VTO data as product hydration has already disabled VTO for the product and all its variants
6. Search for product "3"
7. The VTO app will for this product be asked to provide VTO data as product hydration has not added any such VTO data yet. Depending on what the VTO app returns the product will be enabled or disabled for VTO

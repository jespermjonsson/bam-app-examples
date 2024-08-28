const appContext = await bambuserAppFramework.getContext();
console.info('VTO APP: Bambuser app context ready', appContext);

let appliedItems = [];
appContext.virtualTryOnApi.on('apply', ({ items }) => {
  console.info('VTO APP: apply', items);
  appliedItems = items;
});

let backBuffer, backBufferCtx;
const provider = await appContext.virtualTryOnApi.createProvider({ vendorId: 'example' });
console.info('VTO APP: Virtual try-on provider', provider);
provider.on('init', async () => {
  console.info('VTO APP: init');
});
provider.on('provide-frame', async (inputFrame) => {
  const inputBitmap = inputFrame.bitmap;
  if (!backBuffer) {
    backBuffer = document.createElement('canvas');
    backBuffer.width = inputBitmap.width;
    backBuffer.height = inputBitmap.height;
    backBufferCtx = backBuffer.getContext('2d');
  } else if (backBuffer.width !== inputBitmap.width || backBuffer.height !== inputBitmap.height) {
    backBuffer.width = inputBitmap.width;
    backBuffer.height = inputBitmap.height;
  }
  backBufferCtx.fillStyle = appliedItems[0].color.hexValue;
  backBufferCtx.fillRect(0, 0, inputBitmap.width, inputBitmap.height);
  return window.createImageBitmap(backBuffer);
});
provider.on('pause', () => {
  console.info('VTO APP: pause');
});
provider.on('resume', () => {
  console.info('VTO APP: resume');
});
provider.on('dispose', () => {
  console.info('VTO APP: dispose');
});
provider.on('provide-vto-data', async (event) => {
  console.log('VTO APP: provide-vto-data', event);
  if (event.product.variations.find((variation) => variation.sku === '3')) {
    // Fetch data async from external source to determine if variation skus should be enabled or not for VTO together with all the necessary VTO data
    return {
      category: "lipstic",
      patterns: [{
        id: "matte",
        label: "Matte",
        imageURL: "https://example.com/lipstic-pattern-matte-preview.jpg",
      }],
      variations: [{
        sku: "3",
        color: {
          label: "Red",
          hexValue: "#ff0000",
        },
        finish: "metalic",
     }],
    };
  }

  return false;
});

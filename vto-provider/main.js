function particle(stageWidth, stageHeight) {
  this.x = Math.random() * stageWidth;
  this.y = Math.random() * -stageHeight;
  this.speed = 3 + Math.random();
  this.radius = 6 + Math.random() * 3;
  this.opacity = ((20 + (Math.random() * 80)) / 100) * 0.7;
}

const appContext = await bambuserAppFramework.getContext();
console.info('VTO APP: Bambuser app api ready', appContext);

let appliedItems = [];
appContext.virtualTryOnApi.on('apply', ({ items }) => {
  console.info('VTO APP: apply', items);
  appliedItems = items;
});

let backBuffer, backBufferCtx;
const particles = [];
const particleCount = 60;
const provider = await appContext.virtualTryOnApi.createProvider({ vendorId: 'snowy' });
console.info('VTO APP: Virtual try-on provider', provider);
provider.on('init', async () => {
  console.info('VTO APP: init');
});
provider.on('provide-vto-data', async ({ product }) => {
  console.info('VTO APP: provide-vto-data', product.sku, product.variations.map(v => v.sku));
  if (product.sku === '48') {
    return {
      category: 'lipstic',
      patterns: [{
        id: 'pattern-1',
        label: 'Circular',
        imageURL: new URL('./assets/dashed-circle.png', import.meta.url).href,
      }, {
        id: 'pattern-2',
        label: 'Rectangular',
        imageURL: new URL('./assets/dashed-rect.png', import.meta.url).href,
      }],
      variants: [{
        sku: '49',
        color: {
          label: 'Red',
          hexValue: '#ff0000',
        },
        finish: 'metalic',
      }, {
        sku: '50',
        color: {
          label: 'Nude',
          hexValue: '#ffffff',
        },
        finish: 'matte',
      }, {
        sku: '51',
        color: {
          label: 'Pink',
          hexValue: '#ff10f0',
        },
        finish: 'metalic',
      }],
    };
  } else if (product.sku === '73') {
    return {
      category: 'mascara',
      variants: [{
        sku: '73',
        color: {
          label: 'Black',
          hexValue: '#000000',
        },
      }],
    };
  }
  return null;
});
provider.on('provide-frame', async (inputFrame) => {
  const inputBitmap = inputFrame.bitmap;
  if (!backBuffer) {
    backBuffer = document.createElement('canvas');
    backBuffer.width = inputBitmap.width;
    backBuffer.height = inputBitmap.height;
    backBufferCtx = backBuffer.getContext('2d');
    for (let i = 0; i < particleCount; i++) {
      particles.push(new particle(backBuffer.width, backBuffer.height));
    }
  } else if (backBuffer.width !== inputBitmap.width || backBuffer.height !== inputBitmap.height) {
    backBuffer.width = inputBitmap.width;
    backBuffer.height = inputBitmap.height;
  }

  backBufferCtx.drawImage(inputBitmap, 0, 0);
  if (appliedItems.length > 0) {
    const countParticlesPerItem = Math.floor(particles.length / appliedItems.length);
    let currentItem = -1;
    let colorParts, pattern;

    for (let i = 0; i < particles.length; i++) {
      if (i >= (currentItem + 1) * countParticlesPerItem && currentItem + 1 < appliedItems.length) {
        // All snowflakes are diveded between current applied items.
        // Get color and pattern for next item.
        currentItem++;
        const appliedItem = appliedItems[currentItem];
        const color = appliedItem.color.hexValue;
        let hex = color.slice(1);
        if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        colorParts = [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ];
        pattern = appliedItem.pattern;
      }
      const p = particles[i];
      backBufferCtx.beginPath();
      backBufferCtx.fillStyle = `rgba(${colorParts[0]},${colorParts[1]},${colorParts[2]},${p.opacity})`;
      if (pattern === 'pattern-2') {
        backBufferCtx.rect(p.x, p.y, p.radius * 1.5, p.radius * 1.5);
      } else {
        backBufferCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      }
      backBufferCtx.fill();
      p.y += p.speed;
      if (p.y > backBuffer.height + 10) particles[i] = new particle(backBuffer.width, backBuffer.height);
    }
  }
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

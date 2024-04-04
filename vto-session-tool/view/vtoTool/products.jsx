import { useState } from 'react';
import { useAppContext } from './app.jsx';
import './products.css';

function Products() {
  const context = useAppContext();
  const [pendingApplies, setPendingApplies] = useState({});
  const [lastVariation, setLastVariation] = useState({});
  const appliedProductItems = context.vtoAppliedItems.reduce((acc, item) => {
    const product = context.vtoSkuToProduct[item.id];
    acc[product.sku] = item;
    return acc;
  }, {});

  const onApply = (id, replaceId) => {
    const item = {
      id,
    };
    const product = context.vtoSkuToProduct[item.id];
    setLastVariation(lastValue => ({
      lastValue,
      [product.sku]: id,
    }));
    if (pendingApplies[product.sku]) {
      Object.assign(item, pendingApplies[product.sku]);
      setPendingApplies(items => {
        const newItems = { 
          ...items,
          [product.sku]: undefined,
        };
        return newItems;
      });
    }

    context.virtualTryOnApi.apply({
      item,
      replaceId,
    });
  };

  const onRemoveAppliedItem = (id) => {
    context.virtualTryOnApi.removeAppliedItem({
      id,
    });
  }

  const onRemoveProduct = (product) => {
    context.virtualTryOnApi.removeProduct(product);
  }

  const onPatternChange = (event) => {
    const id = event.target.dataset.sku;
    const pattern = event.target.value;
    const someCustomProp = 'foobar';

    if (context.vtoAppliedItems.some(item => item.id === id)) {
      context.virtualTryOnApi.apply({
        item: {
          id,
          pattern,
          someCustomProp,
        },
      });
    } else {
      const product = context.vtoSkuToProduct[id];
      setPendingApplies(items => ({
        ...items,
        [product.sku]: {
          ...(items[product.sku] || {}),
          pattern,
          someCustomProp: 'foobar',
        },
      }));
    }
  }

  return (
    <div className='bam-container' data-spacing="normal-tight">
      {context.vtoProducts.map(product => {
        const { id: appliedId, ...appliedData } = appliedProductItems[product.sku] || {};
        const variation = product.variations.find(v => v.sku === appliedId) || product.variations[product.defaultVariationIndex];
        return (
          <div className='bam-container' data-spacing="normal-tight" data-variant="card">
            <div className='bam-container' data-spacing="normal-tight" data-layout="row">
              <div className='left'>
                <img className='thumbnail' src={variation.imageUrls[0]} />
              </div>
              <div className='content'>
                <p className='bam-title'>{variation.name}</p>
                <p className='bam-body'>{variation.vtoData.color.label}</p>
                <p className='bam-price'>{variation.price.currency} {variation.price.current}</p>
                <div className='colorCircles'>
                  {product.variations.map(v => (
                    <p className='colorCircle' style={{ borderColor: v.sku === appliedId ? '#2A2A2A' : 'transparent' }} onClick={() => onApply(v.sku, appliedId)}>
                      <span className='colorCircleInner' style={{ backgroundColor: v.vtoData.color.hexValue }}></span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className='bam-container' data-spacing="small" data-layout="row">
              {appliedId ? (
                <button data-size="small" onClick={() => onRemoveAppliedItem(appliedId)}>
                  <p style={{ color: '#DC1B71' }} >Trying</p>
                </button>
              ) : (
                <button data-size="small" onClick={() => onApply(lastVariation[product.sku] || product.variations[0].sku)}>
                  <p>Try-on</p>
                </button>
              )}
              <button data-size="small" onClick={() => onRemoveProduct(product)}>
                <p>Remove</p>
              </button>
            </div>
            {!!product.vtoData?.patterns?.length && (
              <div className='pattern'>
                <p className='bam-title' style={{ marginBottom: '4px' }}>Pattern</p>
                <select style={{ width: '100%' }} value={pendingApplies[product.sku]?.pattern || appliedData?.pattern} onChange={onPatternChange} data-sku={appliedId || product.variations[product.defaultVariationIndex].sku}>
                  {product.vtoData.patterns.map(p => (
                    <option value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
        );
      })}
      {context.vtoProducts.length === 0 && (
        <p>No products added yet</p>
      )}
    </div>
  );
}

export default Products;

import { createContext, useContext, useEffect, useState } from 'react'
import './reset.css';
import Products from './products';

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

function App({ appFrameworkContext }) {
  const [vtoProducts, setVtoProducts] = useState([]);
  const [vtoSkuToProduct, setVtoSkuToProduct] = useState({});
  const [vtoAppliedItems, setVtoAppliedItems] = useState([]);
  const { tool, virtualTryOnApi } = appFrameworkContext;
  
  const appContext = {
    tool,
    virtualTryOnApi,
    vtoProducts,
    vtoSkuToProduct,
    vtoAppliedItems,
  };

  useEffect(() => {
    (async () => {
      const products = await virtualTryOnApi.getProducts();
      console.info('VTO APP (tool): initial products', products);
      const newProductRefs = products.reduce((acc, product) => {
        const skus = [...new Set([product.sku, ...product.variations.map(v => v.sku)])];
        for (const sku of skus) {
          acc[sku] = product;
        }
        return acc;
      }, {});
      setVtoSkuToProduct(prevState => ({
        ...prevState,
        ...newProductRefs,
      }));
      setVtoProducts(products);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const appliedItems = await virtualTryOnApi.getAppliedItems();
      console.info('VTO APP (tool): initial applied items', appliedItems);
      setVtoAppliedItems(appliedItems);
    })();
  }, []);

  useEffect(() => {
    const onProductAdd = ({ product }) => {
      console.info('VTO APP (tool): product-added', product);
      const skus = [...new Set([product.sku, ...product.variations.map(v => v.sku)])];
      const newProductRefs = skus.reduce((acc, sku) => {
        acc[sku] = product;
        return acc;
      }, {});
      setVtoSkuToProduct(prevState => ({
        ...prevState,
        ...newProductRefs,
      }));
      setVtoProducts(prevState => ([
        ...prevState,
        product,
      ]));
    };

    const onProductRemove = ({ product }) => {
      console.info('VTO APP (tool): product-removed', product);
      const skus = [...new Set([product.sku, ...product.variations.map(v => v.sku)])];
      setVtoSkuToProduct(prevState => {
        const newState = Object.assign({}, prevState);
        skus.forEach(sku => {
          delete newState[sku];
        });
        return { ...newState };
      });
      setVtoProducts(prevState => {
        const index = prevState.findIndex(p => p.sku === product.sku);
        if (index < 0) return prevState;
        const newState = [...prevState];
        newState.splice(index, 1);
        return newState;
      });
    };

    const onApply = async ({ items }) => {
      console.info('VTO APP (tool): apply', items);
      setVtoAppliedItems(items);
    };

    virtualTryOnApi.on('product-added', onProductAdd);
    virtualTryOnApi.on('product-removed', onProductRemove);
    virtualTryOnApi.on('apply', onApply);

    return () => {
      virtualTryOnApi.off('product-added', onProductAdd);
      virtualTryOnApi.off('product-removed', onProductRemove);
      virtualTryOnApi.off('apply', onApply);
    }
  }, []);

  useEffect(() => {
    tool.setReady();
  }, []);

  const deactivate = () => {
    virtualTryOnApi.removeAllAppliedItems();
  };

  const removeAllProducts = () => {
    for (const product of vtoProducts) {
      virtualTryOnApi.removeProduct(product);
    }
  }

  return (
    <AppContext.Provider value={appContext}>
      <Products />
      <div style={{ display: 'flex', gap: '8px' }}>
        {!!vtoAppliedItems.length && <button data-size="large-wide" onClick={deactivate}>Deactivate</button>}
        {!!vtoProducts.length && <button data-size="large-wide" onClick={removeAllProducts}>Remove all</button>}
      </div>
    </AppContext.Provider>
  )
}

export default App;

import { useEffect } from 'react';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { api } from '../api';
import { useAuth } from '../stores/auth'
import { useCatalog } from '../stores/catalog';
import { ProductComponent } from '../components/product/Product';

import './Catalog.css'

const CatalogWrapper = styled.div``;

export const Catalog: React.FC = () => {
  const token = useAuth(state => state.token)

  const { products, setProducts } = useCatalog(
    useShallow((state) => ({
      products: state.products,
      setProducts: state.setProducts,
    }))
  );

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  return (
    <CatalogWrapper>
      <h1>Каталог</h1>
      <div className="catalog-products">
        {
          products.map((product) => (
            <ProductComponent
              {...product}
              key={product.id}
              isWithProductLink={true}
              isAddToCartControls={Boolean(token)}
            />
          ))
        }
      </div> 
    </CatalogWrapper>
  );
};

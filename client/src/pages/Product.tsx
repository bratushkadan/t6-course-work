import { useEffect, useState } from 'react';
import { ProductComponent } from '../components/product/Product';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Product } from '../api/types';
import { alertError } from '../util/error';
import styled from 'styled-components';

const ProductsContainer = styled.div`
margin: 1.25rem 0.5rem;
`

export const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);

  const params = useParams();

  useEffect(() => {
    api
      .getProduct(params.id as unknown as number)
      .then(setProduct)
      .catch(alertError);
  }, []);

  return (
    <>
      {!product ? null : (
        <ProductsContainer>
          <ProductComponent {...product} />
        </ProductsContainer>
      )}
    </>
  );
};

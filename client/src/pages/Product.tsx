import { useEffect, useState } from 'react';
import { ProductComponent } from '../components/product/Product';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Product } from '../api/types';
import { alertError } from '../util/error';

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
        <>
          <ProductComponent {...product} />
        </>
      )}
    </>
  );
};

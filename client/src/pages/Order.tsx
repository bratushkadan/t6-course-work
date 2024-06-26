import { useEffect, useState } from 'react';
import { api } from '../api';
import { OrderInfoComponent } from '../components/OrderInfo';
import { useAuth } from '../stores';
import { Order } from '../api/types';
import { alertError } from '../util/error';
import { useParams } from 'react-router-dom';
import { OrderProductComponent } from '../components/OrderProduct';
import styled from 'styled-components';

const OrderProductsContainer = styled.div`
  margin: 1rem 0 1rem 0.33rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: 1rem;
`

export const OrderPage: React.FC = () => {
  const token = useAuth((state) => state.token);
  const [order, setOrder] = useState<Order | null>(null);

  const params = useParams();

  useEffect(() => {
    if (token === null) {
      return;
    }

    api
      .getOrder(token, params.id as unknown as number)
      .then(setOrder)
      .catch(alertError);
  }, [token]);

  return (
    order && (
      <>
        <OrderInfoComponent {...order} />
        <div>Сумма заказа: {order.positions.reduce((prev, cur) => prev + cur.price * cur.quantity, 0) / 100} ₽</div>
        <OrderProductsContainer>
          {order.positions.map((props) => (
            <OrderProductComponent key={props.product_id} {...props} price={props.price / 100} isWithProductLink={true} />
          ))}
        </OrderProductsContainer>
      </>
    )
  );
};

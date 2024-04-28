import { useShallow } from 'zustand/react/shallow';
import { useAuth, useCart } from '../stores';
import { api } from '../api';
import { useEffect } from 'react';
import { CartPositionComponent } from '../components/CartPosition';
import { BlockBtn } from '../components/generic';
import { alertError } from '../util/error';
import styled from 'styled-components';

const CartContainer = styled.div`
  margin: 1rem 0 1rem 0.33rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: 1rem;
`

export const CartPage: React.FC = () => {
  const token = useAuth((state) => state.token);

  const { cart, setCart } = useCart(useShallow(({ cart, setCart }) => ({ cart, setCart })));

  useEffect(() => {
    if (token) {
      api.getCart(token).then(setCart).catch(alertError);
    }
  }, [token]);

  const handleClearCart = () => {
      if (!token) {
          return
      }

    api
        .clearCart(token)
        .then(() => {
            setCart([])
        })
  }

  const handlePlaceOrder = () => {
    if (!token) {
      return;
    }

    api
      .createOrder(token)
      .then(() => {
        alert('Заказ создан!')
        setCart([])
      })
      .catch(alertError);
  };

  return (
    <>
      <h1>Корзина{cart.length === 0 ? <span> пуста</span> : <span></span>}</h1>
      {cart.length === 0 ? '' : <BlockBtn onClick={handleClearCart}>Очистить корзину</BlockBtn>}
      {cart.length > 0 && <>
        <CartContainer>
          {cart.map((props) => <CartPositionComponent key={props.product_id} {...props} />)}
        </CartContainer>
        <BlockBtn onClick={handlePlaceOrder}>Сделать заказ</BlockBtn>
      </>}
    </>
  );
};

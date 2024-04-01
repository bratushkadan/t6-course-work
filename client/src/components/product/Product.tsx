import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { CartPosition, Product as IProduct, Product } from '../../api/types';
import { BlockBtn, Btn } from '../generic';
import { useAuth, useCart } from '../../stores';
import { useShallow } from 'zustand/react/shallow';
import { api } from '../../api';
import { alertError } from '../../util/error';

export const CartControls: React.FC<{ product: Product }> = ({ product }) => {
  const token = useAuth((state) => state.token);
  const { cart, setCart } = useCart(useShallow((state) => ({ cart: state.cart, setCart: state.setCart })));

  const handleAddToCart = useCallback(() => {
    if (!token) {
      return;
    }
    api
      .changeCartPosition(token, {
        product_id: product.id,
        quantity: 1,
      })
      .then((updatedCartPosition) =>
        setCart([
          ...cart,
          {
            product_id: product.id,
            name: product.description,
            description: product.description,
            quantity: updatedCartPosition.quantity,
            price: product.price,
            image_url: product.image_url,
          },
        ])
      );
  }, [cart, product.id]);

  const handleIncrementCartPosition = useCallback(
    (cartPosition: CartPosition) => {
      api
        .changeCartPosition(token as string, {
          product_id: product.id,
          quantity: cartPosition.quantity + 1,
        })
        .then((updatedCartPosition) =>
          setCart(
            cart.map((cartPosition) => {
              if (cartPosition.product_id !== updatedCartPosition.product_id) {
                return cartPosition;
              }
              return { ...cartPosition, quantity: updatedCartPosition.quantity };
            })
          )
        )
        .catch(alertError);
    },
    [cart, product.id]
  );
  const handleDecrementCartPosition = useCallback(
    
    (cartPosition: CartPosition) => {
      if (!token) {
        return
      }
      api
        .changeCartPosition(token, {
          product_id: product.id,
          quantity: cartPosition.quantity - 1,
        })
        .then((updatedCartPosition) =>
          setCart(
            cart
              .map((cartPosition) => {
                if (cartPosition.product_id !== updatedCartPosition.product_id) {
                  return cartPosition;
                }
                return { ...cartPosition, quantity: updatedCartPosition.quantity };
              })
              .filter((cartPosition) => cartPosition.quantity !== 0)
          )
        )
        .catch(alertError);
    },
    [cart, product.id]
  );

  const item = cart.find((cartPosition) => cartPosition.product_id === product.id);

  return (
    <>
      {!item ? (
        <BlockBtn onClick={handleAddToCart}>Добавить в корзину</BlockBtn>
      ) : (
        <div>
          <span style={{ display: 'inline-block', marginRight: '0.5rem' }}>В корзине: {item.quantity}</span>
          <Btn onClick={() => handleIncrementCartPosition(item)}>+</Btn>
          <Btn onClick={() => handleDecrementCartPosition(item)}>-</Btn>
        </div>
      )}
    </>
  );
};

export const ProductComponent: React.FC<
  IProduct & { isWithProductLink?: boolean; isAddToCartControls?: boolean; } & {
    data?: Partial<{ cart: CartPosition[]; }>;
  }
> = (props) => {
  return (
    <div className="product-card">
      <h2>{props.isWithProductLink ? <Link to={`/products/${props.id}`}>{props.name}</Link> : props.name}</h2>
      <img width={150} height={150} src={props.image_url} alt={props.name} />
      <div>{props.description}</div>
      <div>{props.price} ₽</div>
      {!props.isAddToCartControls ? null : <CartControls product={props} />}
    </div>
  );
};

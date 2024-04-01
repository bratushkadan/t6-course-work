import React from 'react';
import { CartPosition } from '../api/types';
import { Link } from 'react-router-dom';
import {CartControls} from './CartControls';

export const CartPositionComponent: React.FC<CartPosition> = (props) => {
  return (
    <div className="cart-position-card">
      <h3>
        <Link to={`/products/${props.product_id}`}>{props.name}</Link>
      </h3>
      <img width={150} height={150} src={props.image_url} alt={props.name} />
      <div>{props.description}</div>
      <div>{props.price/100} ₽</div>
      <CartControls {...props} />
    </div>
  );
};

import React from 'react';
import { CartPosition } from '../api/types';
import { Link } from 'react-router-dom';
import {CartControls} from './CartControls';

import './CartPosition.css'

export const CartPositionComponent: React.FC<CartPosition> = (props) => {
  return (
    <div className="cart-position-card">
      <h3 className="cart-position-title">
        <Link to={`/products/${props.product_id}`}>{props.name}</Link>
      </h3>
      <div className="cart-position-image">
        <img src={props.image_url} alt={props.name} />
      </div>
      <div className="cart-position-description">{props.description}</div>
      <div className="cart-position-price">{props.price/100} ₽</div>
      <CartControls {...props} />
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import type { Order } from '../api/types';

export const OrderProductComponent: React.FC<Order['positions'][number] & { isWithProductLink?: boolean }> = (
  props
) => {
  return (
    <div className="order-product-card cart-position-card">
      <h2 className="cart-position-title">
        {props.isWithProductLink
          ? <Link
              to={`/products/${props.product_id}`}>
                {props.name}
            </Link>
          : props.name}
      </h2>
      <div className="cart-position-image">
        <img src={props.image_url} alt={props.name} />
      </div>
      <div className="cart-position-description">
        {props.description}
        {props.quantity > 1 && <p>
          <hr/>
          <div>{props.quantity} позиций</div>
          <div>Всего {props.quantity * props.price} ₽</div>
        </p>}
      </div>
      <div className="cart-position-price" style={{alignSelf: 'flex-end'}}>{props.price} ₽</div>
    </div>
  );
};

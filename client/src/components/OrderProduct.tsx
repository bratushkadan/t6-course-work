import React from 'react';
import { Link } from 'react-router-dom';
import type { Order } from '../api/types';

export const OrderProductComponent: React.FC<Order['positions'][number] & { isWithProductLink?: boolean }> = (
  props
) => {
  return (
    <div className="order-product-card">
      <h2>{props.isWithProductLink ? <Link to={`/products/${props.product_id}`}>{props.name}</Link> : props.name}</h2>
      <img width={150} height={150} src={props.image_url} alt={props.name} />
      <div>{props.description}</div>
      <div>{props.price} ₽</div>
      {props.quantity > 1 && <div>{props.quantity} позиций</div>}
      {props.quantity > 1 && <div>Всего {props.quantity * props.price} ₽</div>}
      <hr />
    </div>
  );
};

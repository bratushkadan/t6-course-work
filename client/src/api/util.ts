import { Product, OrderInfo } from './types';

export const transformProduct: (product: Product) => Product = (product) => ({
  ...product,
  price: product.price / 100,
});

export function omitFalsy(obj: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(obj).filter(([_, val]) => Boolean(val)));
}

export const localizeOrderStatus = (status: OrderInfo['status']): string => {
  switch (status) {
    case 'created':
      return 'Создан'
    case 'canceled':
      return 'Отменен'
    case 'completed':
      return 'Выполнен'
    case 'delivery':
      return 'Курьер спешит к вам'
    case 'in_progress':
      return 'Готовится'
    case 'processed':
      return 'Ждем курьера'
    default:
    throw new Error('такого статуса заказа нет!')
  }
}

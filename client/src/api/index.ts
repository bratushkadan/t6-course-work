import ky from 'ky';

import type {
  User,
  CreateUserPayload,
  GetTokenPayload,
  Token,
  ValidateTokenPayload,
  ValidateTokenResponse,
  CreateUserResponse,
  Product,
  Category,
  CartPosition,
  ChangeCartPositionPayload,
  MinimalCartPosition,
  Order,
  OrderInfo,
} from './types';
import { transformProduct } from './util';

const v1Api = ky.extend({
  prefixUrl: 'http://localhost:8080/v1',
});

const X_AUTH_TOKEN = 'X-Auth-Token';

const getUser = (id: User['id']) => v1Api.get(`users/${id}`).json<CreateUserResponse>();
const getUserMeByToken = (token: string) =>
  v1Api
    .get(`users/me`, {
      headers: {
        [X_AUTH_TOKEN]: token,
      },
    })
    .json<CreateUserResponse>();
const createUser = (payload: CreateUserPayload) =>
  v1Api
    .post(`users`, {
      json: payload,
    })
    .json<User>();
const getToken = (payload: GetTokenPayload) =>
  v1Api.get(`auth/token/user?` + new URLSearchParams(payload)).json<Token>();
const validateToken = (payload: ValidateTokenPayload) =>
  v1Api
    .post(`auth/token/user`, {
      headers: {
        [X_AUTH_TOKEN]: payload.token,
      },
    })
    .json<ValidateTokenResponse>();

const getProducts = async () => {
  const products = await v1Api.get('products').json<Product[]>();

  return products.map(transformProduct);
};
const getProduct = (id: number) => v1Api.get(`products/${id}`).json<Product>().then(transformProduct);

const getCategories = () => v1Api.get('categories').json<Category[]>();
const getCategory = (id: number) => v1Api.get(`categories/${id}`).json<Category>();

export const api = {
  getUser,
  getUserMeByToken,
  createUser,
  getToken,
  validateToken,
  getProducts,
  getProduct,
  getCategories,
  getCategory,
  getCart: (token: string) =>
    v1Api
      .get('cart', {
        headers: {
          [X_AUTH_TOKEN]: token,
        },
      })
      .json<CartPosition[]>(),
  changeCartPosition: (token: string, payload: ChangeCartPositionPayload) =>
    v1Api
      .post('cart', {
        headers: {
          [X_AUTH_TOKEN]: token,
        },
        json: payload,
      })
      .json<MinimalCartPosition>(),
  clearCart: (token: string) =>
    v1Api
      .delete('cart', {
        headers: {
          [X_AUTH_TOKEN]: token,
        },
      })
      .json<MinimalCartPosition[]>(),
  getOrder: (token: string, id: number) =>
    v1Api
      .get(`orders/${id}`, {
        headers: {
          [X_AUTH_TOKEN]: token,
        },
      })
      .json<Order>(),
  getOrders: (token: string) =>
    v1Api
      .get(`orders`, {
        headers: {
          [X_AUTH_TOKEN]: token,
        },
      })
      .json<OrderInfo[]>(),
  createOrder: (token: string) =>
    v1Api
      .post('orders', {
        headers: {
          [X_AUTH_TOKEN]: token,
        },
      })
      .json<Order>(),
};


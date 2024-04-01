export type Error = {
  error: string;
};

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export type CreateUserPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
};
export type CreateUserResponse = User;

export type Token = {
  token: string;
};

export type GetTokenPayload = {
  email: string;
  password: string;
};

export type ValidateTokenPayload = Token;
export type ValidateTokenResponse = {
  valid: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  created: number;
};

export type CartPosition = {
  product_id: string;
  quantity: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

export type ChangeCartPositionPayload = {
  product_id: string;
  quantity: number;
};

export type MinimalCartPosition = {
  product_id: string;
  quantity: number;
};

export type Order = {
  id: string;
  status: 'created';
  user_id: string;
  created: number;
  status_modified: number;
  positions: Array<{
    product_id: string;
    quantity: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  }>;
};

export type OrderInfo = {
  id: string;
  status: 'created' | 'in_progress' | 'processed' | 'delivery' | 'canceled' | 'completed';
  user_id: string;
  created: number;
  status_modified: number;
};


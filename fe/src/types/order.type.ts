export type OrderProduct = {
  productId: string;

  name: string;

  image: string;

  price: number;

  quantity: number;
};

export type Order = {
  id: string;

  customerId: string;

  products: OrderProduct[];

  total: number;

  status: string;

  createdAt?: string;

  updatedAt?: string;
};

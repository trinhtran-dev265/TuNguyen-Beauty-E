import { api } from "../api/api";

export const addToCart = async (data: {
  userId: string;

  productId: string;

  name: string;

  image: string;

  price: number;

  quantity: number;
}) => {
  const response = await api.post("/cart/add", data);

  return response.data;
};

export const getCart = async (userId: string) => {
  const response = await api.get(`/cart/${userId}`);

  return response.data;
};

export const updateCartQuantity = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const response = await api.patch(`/cart/${userId}/${productId}`, {
    quantity,
  });

  return response.data;
};

export const removeCartItem = async (userId: string, productId: string) => {
  const response = await api.delete(`/cart/${userId}/${productId}`);

  return response.data;
};

export const clearCart = async (userId: string) => {
  const response = await api.delete(`/cart/${userId}/clear`);

  return response.data;
};

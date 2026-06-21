import { api } from "../api/api";

export const checkout = async (userId: string) => {
  const response = await api.post("/orders/checkout", {
    userId,
  });

  return response.data;
};

export const getMyOrders = async (userId: string) => {
  const response = await api.get(`/orders/user/${userId}`);

  return response.data;
};

export const getOrderById = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);

  return response.data;
};

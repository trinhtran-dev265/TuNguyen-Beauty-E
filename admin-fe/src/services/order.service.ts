import { api } from "./api";

export const getOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};

export const updateOrderStatus = async (
  id: string,

  status: string,
) => {
  const response = await api.patch(
    `/orders/${id}/status`,

    { status },
  );

  return response.data;
};

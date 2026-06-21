import { api } from "../api/api";

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  const response = await api.get(`/products/category/${category}`);

  return response.data;
};

export const searchProducts = async (keyword: string) => {
  const response = await api.get(`/products/search`, {
    params: {
      keyword,
    },
  });

  return response.data;
};

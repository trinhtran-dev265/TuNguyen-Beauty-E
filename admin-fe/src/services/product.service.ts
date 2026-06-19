import { api } from "./api";

type ProductData = {
  name: string;

  description: string;

  category: string;

  skinType: string;

  price: number;

  stock: number;

  image?: string;
};

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data;
};

export const createProduct = async (data: FormData) => {
  const response = await api.post(
    "/products",

    data,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const updateProduct = async (
  id: string,

  data: Partial<ProductData>,
) => {
  const response = await api.patch(
    `/products/${id}`,

    data,
  );

  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};

export const updateProductStatus = async (id: string) => {
  const response = await api.patch(`/products/${id}/status`);

  return response.data;
};

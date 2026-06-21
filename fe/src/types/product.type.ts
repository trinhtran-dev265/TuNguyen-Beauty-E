export type Product = {
  id: string;

  name: string;

  description: string;

  category: string;

  skinType: string;

  price: number;

  stock: number;

  image: string;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
};

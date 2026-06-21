export type MainStackParamList = {
  Splash: undefined;

  Login: undefined;

  Register: undefined;
  Home: undefined;

  CategoryList: undefined;

  ProductList: {
    category: string | null;
  };

  ProductDetail: {
    productId: string;
  };

  Cart: undefined;

  OrderSuccess: {
    orderId: string;
  };

  OrderHistory: undefined;

  Profile: undefined;
};

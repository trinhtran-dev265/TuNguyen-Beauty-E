import { useEffect, useMemo, useState } from "react";
import { checkout } from "../services/order.service";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

import CartItemCard from "../components/cart/CartItemCard";

import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartQuantity,
} from "../services/cart.service";

import { CartItem } from "../types/cart.type";

import { COLORS } from "../contants/color";
import { SPACING } from "../contants/spacing";

export default function CartScreen() {
  const navigation = useNavigation<any>();

  const { user } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    if (!user) return;

    try {
      const response = await getCart(user.uid);

      setItems(response.data.items || []);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (item: CartItem) => {
    if (!user) return;

    await updateCartQuantity(user.uid, item.productId, item.quantity + 1);

    loadCart();
  };

  const handleDecrease = async (item: CartItem) => {
    if (!user) return;

    if (item.quantity === 1) {
      await removeCartItem(user.uid, item.productId);
    } else {
      await updateCartQuantity(user.uid, item.productId, item.quantity - 1);
    }

    loadCart();
  };

  const handleDelete = async (item: CartItem) => {
    if (!user) return;

    await removeCartItem(user.uid, item.productId);

    loadCart();
  };

  const handleClear = async () => {
    if (!user) return;

    Alert.alert("Clear Cart", "Remove all items?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          console.log("CLEARING...");

          const result = await clearCart(user.uid);

          console.log(result);

          loadCart();
        },
      },
    ]);
  };

  const handleCheckout = async () => {
    if (!user) return;

    try {
      const result = await checkout(user.uid);

      navigation.replace("OrderSuccess", {
        orderId: result.data.orderId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{
          flex: 1,
        }}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          justifyContent: "space-between",

          paddingHorizontal: SPACING.lg,

          paddingVertical: SPACING.lg,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Cart
        </Text>

        <TouchableOpacity onPress={handleClear}>
          <MaterialCommunityIcons
            name="delete-sweep-outline"
            size={24}
            color="#EF4444"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        contentContainerStyle={{
          paddingHorizontal: SPACING.lg,
        }}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onIncrease={() => handleIncrease(item)}
            onDecrease={() => handleDecrease(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
      />

      <View
        style={{
          backgroundColor: "#FFF",

          padding: 24,

          borderTopLeftRadius: 24,

          borderTopRightRadius: 24,
        }}
      >
        <Text
          style={{
            color: "#666",
          }}
        >
          Total
        </Text>

        <Text
          style={{
            fontSize: 30,

            fontWeight: "700",

            color: COLORS.primary,

            marginTop: 6,
          }}
        >
          {total.toLocaleString()}đ
        </Text>

        <TouchableOpacity
          onPress={handleCheckout}
          style={{
            marginTop: 20,

            height: 54,

            borderRadius: 16,

            backgroundColor: COLORS.primary,

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFF",

              fontSize: 16,

              fontWeight: "700",
            }}
          >
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

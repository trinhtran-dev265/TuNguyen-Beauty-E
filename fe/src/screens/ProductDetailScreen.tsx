import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Product } from "../types/product.type";

import { getProductById } from "../services/product.service";

import { addToCart } from "../services/cart.service";

import { useAuth } from "../context/AuthContext";

import { COLORS } from "../contants/color";
import { SPACING } from "../contants/spacing";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { API_URL } from "../contants/config";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function ProductDetailScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<any>();

  const { user } = useAuth();

  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductById(productId);

      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user || !product) {
      return;
    }

    try {
      await addToCart({
        userId: user.uid,

        productId: product.id,

        name: product.name,

        image: product.image,

        price: product.price,

        quantity,
      });

      Alert.alert("Success", "Added to cart");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  if (loading || !product) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          paddingHorizontal: SPACING.lg,
          paddingTop: 60,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          Product Detail
        </Text>

        <MaterialCommunityIcons
          name="cart-outline"
          size={24}
          onPress={() => navigation.navigate("Cart")}
        />
      </View>
      {/* Image */}
      <Image
        source={{
          uri: `${API_URL}/uploads/products/${product.image}`,
        }}
        style={{
          width: "90%",
          height: 300,

          alignSelf: "center",

          marginTop: 20,

          borderRadius: 28,
        }}
      />
      {/* Product Info Card */}
      <View
        style={{
          marginTop: 24,

          marginHorizontal: SPACING.lg,

          backgroundColor: "#FFF",

          borderRadius: 28,

          padding: 24,

          shadowColor: "#000",

          shadowOffset: {
            width: 0,
            height: 4,
          },

          shadowOpacity: 0.08,

          shadowRadius: 10,

          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: COLORS.text,
          }}
        >
          {product.name}
        </Text>

        {/* Category Badge */}

        <View
          style={{
            alignSelf: "flex-start",

            marginTop: 12,

            backgroundColor: "#EEF7F3",

            paddingHorizontal: 12,

            paddingVertical: 6,

            borderRadius: 999,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: "600",
            }}
          >
            {product.category}
          </Text>
        </View>

        {/* Price */}

        <Text
          style={{
            marginTop: 18,

            fontSize: 30,

            color: COLORS.primary,

            fontWeight: "700",
          }}
        >
          {product.price.toLocaleString()}đ
        </Text>

        {/* Description Title */}

        <Text
          style={{
            marginTop: 28,

            fontSize: 18,

            fontWeight: "700",

            color: COLORS.text,
          }}
        >
          Description
        </Text>

        {/* Description */}

        <Text
          numberOfLines={expanded ? undefined : 3}
          style={{
            marginTop: 12,

            color: "#666",

            lineHeight: 24,
          }}
        >
          {product.description}
        </Text>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text
            style={{
              color: COLORS.primary,

              marginTop: 8,

              fontWeight: "600",
            }}
          >
            {expanded ? "Show Less" : "View More"}
          </Text>
        </TouchableOpacity>

        {/* Quantity + Cart */}

        <View
          style={{
            flexDirection: "row",

            marginTop: 28,

            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              backgroundColor: "#F8F8F8",

              borderRadius: 16,

              paddingHorizontal: 16,

              height: 54,
            }}
          >
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <MaterialCommunityIcons name="minus" size={22} />
            </TouchableOpacity>

            <Text
              style={{
                marginHorizontal: 22,

                fontWeight: "700",

                fontSize: 16,
              }}
            >
              {quantity}
            </Text>

            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <MaterialCommunityIcons name="plus" size={22} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleAddToCart}
            style={{
              flex: 1,

              marginLeft: 12,

              backgroundColor: COLORS.primary,

              borderRadius: 16,

              height: 54,

              justifyContent: "center",

              alignItems: "center",

              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons
              name="cart-outline"
              size={20}
              color="#FFF"
            />

            <Text
              style={{
                color: "#FFF",

                marginLeft: 8,

                fontWeight: "700",

                fontSize: 15,
              }}
            >
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

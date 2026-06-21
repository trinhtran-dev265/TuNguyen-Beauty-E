import { Image, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../contants/color";
import { Product } from "../types/product.type";

type Props = {
  product: Product;

  onPress?: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,

        backgroundColor: COLORS.white,

        borderRadius: 16,

        overflow: "hidden",

        margin: 8,
        shadowColor: "#000",

        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.08,

        shadowRadius: 6,

        elevation: 4,

        borderWidth: 1,

        borderColor: "#F0F0F0",
      }}
    >
      <View
        style={{
          position: "absolute",

          left: 10,

          top: 10,

          zIndex: 10,

          backgroundColor: "#0F5B4F",

          paddingHorizontal: 10,

          paddingVertical: 4,

          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#FFF",

            fontSize: 10,

            fontWeight: "700",
          }}
        >
          NEW
        </Text>
      </View>
      <Image
        source={{
          uri: `http://192.168.1.15:3000/uploads/products/${product.image}`,
        }}
        style={{
          width: "100%",
          height: 160,
        }}
      />

      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: COLORS.text,
          }}
        >
          {product.name}
        </Text>

        <Text
          style={{
            marginTop: 8,
            color: COLORS.primary,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {product.price.toLocaleString()}đ
        </Text>
      </View>
      <View
        style={{
          position: "absolute",

          right: 10,

          top: 10,

          zIndex: 10,

          width: 34,

          height: 34,

          borderRadius: 17,

          backgroundColor: "#FFFFFF",

          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons name="heart-outline" size={18} color="#666" />
      </View>
    </Pressable>
  );
}

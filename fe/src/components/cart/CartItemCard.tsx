import { Image, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { CartItem } from "../../types/cart.type";

import { COLORS } from "../../contants/color";

type Props = {
  item: CartItem;

  onIncrease: () => void;

  onDecrease: () => void;

  onDelete: () => void;
};

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onDelete,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#FFF",

        borderRadius: 18,

        padding: 14,

        marginBottom: 14,

        shadowColor: "#000",

        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.05,

        shadowRadius: 4,

        elevation: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          source={{
            uri: `http://192.168.1.15:3000/uploads/products/${item.image}`,
          }}
          style={{
            width: 90,
            height: 90,
            borderRadius: 12,
          }}
        />

        <View
          style={{
            flex: 1,
            marginLeft: 14,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                flex: 1,

                fontSize: 16,

                fontWeight: "700",
              }}
            >
              {item.name}
            </Text>

            <TouchableOpacity onPress={onDelete}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={22}
                color="#EF4444"
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              marginTop: 10,

              color: COLORS.primary,

              fontSize: 18,

              fontWeight: "700",
            }}
          >
            {item.price.toLocaleString()}đ
          </Text>

          <View
            style={{
              marginTop: 12,

              flexDirection: "row",

              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                borderWidth: 1,

                borderColor: "#EEE",

                borderRadius: 12,

                paddingHorizontal: 12,

                height: 40,
              }}
            >
              <TouchableOpacity onPress={onDecrease}>
                <MaterialCommunityIcons name="minus" size={20} />
              </TouchableOpacity>

              <Text
                style={{
                  marginHorizontal: 16,

                  fontWeight: "700",
                }}
              >
                {item.quantity}
              </Text>

              <TouchableOpacity onPress={onIncrease}>
                <MaterialCommunityIcons name="plus" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

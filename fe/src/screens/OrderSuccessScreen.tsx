import { Text, TouchableOpacity, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../contants/color";

export default function OrderSuccessScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const { orderId } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#FFF",
      }}
    >
      <MaterialCommunityIcons
        name="check-decagram"
        size={100}
        color="#22C55E"
      />

      <Text
        style={{
          marginTop: 20,
          fontSize: 30,
          fontWeight: "700",
        }}
      >
        Congratulations!
      </Text>

      <Text
        style={{
          marginTop: 20,
          color: "#666",
        }}
      >
        Order ID
      </Text>

      <Text
        style={{
          marginTop: 6,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        #{orderId}
      </Text>

      <Text
        style={{
          marginTop: 20,
          color: COLORS.primary,
          fontWeight: "600",
        }}
      >
        Status: Pending
      </Text>

      <TouchableOpacity
        onPress={() => navigation.replace("Main")}
        style={{
          marginTop: 40,

          width: "100%",

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
            fontWeight: "700",
          }}
        >
          Back To Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("OrderHistory")}
        style={{
          marginTop: 14,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
          }}
        >
          Track Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}

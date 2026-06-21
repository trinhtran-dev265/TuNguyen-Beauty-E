import { View, Text, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../contants/color";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../types/navigation";

type Props = {
  userName?: string;
};

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function HomeHeader({ userName }: Props) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            color: COLORS.textSecondary,
            fontSize: 14,
          }}
        >
          Welcome 👋
        </Text>

        <Text
          style={{
            fontSize: 26,
            fontWeight: "700",
            marginTop: 4,
            color: COLORS.text,
          }}
        >
          {userName || "Guest"}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={0.8}
          style={{
            width: 48,
            height: 48,

            borderRadius: 14,

            backgroundColor: "#FFF",

            justifyContent: "center",
            alignItems: "center",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 6,

            elevation: 3,
          }}
        >
          <MaterialCommunityIcons
            name="account-outline"
            size={22}
            color={COLORS.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 48,
            height: 48,

            borderRadius: 14,

            backgroundColor: "#FFF",

            justifyContent: "center",
            alignItems: "center",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 6,

            elevation: 3,
          }}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={22}
            color={COLORS.text}
            onPress={() => navigation.navigate("Cart")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

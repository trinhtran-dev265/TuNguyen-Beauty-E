import { View, Text, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  name: string;
  count: number;
  onPress?: () => void;
};

const COLORS = ["#FCE4EC", "#E3F2FD", "#FFF3E0", "#E8F5E9", "#F3E5F5"];

export default function CategoryCard({ name, count, onPress }: Props) {
  const bg = COLORS[name.length % COLORS.length];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",

        alignItems: "center",

        backgroundColor: "#FFF",

        borderRadius: 18,

        padding: 16,

        marginBottom: 16,

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
          width: 56,
          height: 56,

          borderRadius: 28,

          backgroundColor: bg,

          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons name="eye-outline" size={24} />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: 14,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {name}
        </Text>

        <Text
          style={{
            color: "#888",
            marginTop: 4,
          }}
        >
          {count} items
        </Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );
}

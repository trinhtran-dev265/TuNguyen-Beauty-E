import { Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../../contants/color";

const CATEGORY_COLORS = ["#E8F5E9", "#E3F2FD", "#FFF3E0", "#FCE4EC", "#F3E5F5"];

type Props = {
  category: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function CategoryChip({ category, selected, onPress }: Props) {
  const bgColor = CATEGORY_COLORS[category.length % CATEGORY_COLORS.length];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
        width: 80,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: selected ? COLORS.primary : bgColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="eye-outline"
          size={24}
          color={selected ? "#FFFFFF" : COLORS.primary}
        />
      </View>

      <Text
        numberOfLines={1}
        style={{
          marginTop: 8,
          fontSize: 12,
          color: selected ? COLORS.primary : "#333",
          fontWeight: "500",
        }}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
}

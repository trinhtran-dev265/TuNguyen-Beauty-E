import { TextInput, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../../contants/color";

type Props = {
  value: string;

  onChangeText: (value: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",

        alignItems: "center",

        borderWidth: 1,

        borderColor: COLORS.border,

        borderRadius: 14,

        paddingHorizontal: 16,

        height: 54,
      }}
    >
      <MaterialCommunityIcons name="magnify" size={22} color="#888" />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search product..."
        style={{
          flex: 1,

          marginLeft: 10,
        }}
      />
    </View>
  );
}

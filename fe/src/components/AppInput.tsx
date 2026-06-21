import { Text, TextInput, View } from "react-native";
import { COLORS } from "../contants/color";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  error?: string;
};

export default function AppInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  placeholder,
  error,
}: Props) {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          marginBottom: 8,
          color: COLORS.textSecondary,
          fontSize: 14,
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={{
          height: 54,
          borderWidth: 1,
          borderColor: error ? COLORS.error : COLORS.border,
          borderRadius: 12,
          paddingHorizontal: 16,
          backgroundColor: COLORS.white,
        }}
      />

      {error && (
        <Text
          style={{
            color: COLORS.error,
            marginTop: 6,
            fontSize: 12,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

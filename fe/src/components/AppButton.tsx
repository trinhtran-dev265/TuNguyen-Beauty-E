import { ActivityIndicator, Pressable, Text } from "react-native";
import { COLORS } from "../contants/color";

type Props = {
  title: string;

  onPress: () => void;

  loading?: boolean;

  disabled?: boolean;
};

export default function AppButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        height: 54,

        borderRadius: 12,

        backgroundColor: COLORS.primary,

        justifyContent: "center",

        alignItems: "center",

        opacity: disabled ? 0.6 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text
          style={{
            color: COLORS.white,

            fontSize: 16,

            fontWeight: "600",
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

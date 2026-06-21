import { useState } from "react";

import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useForm, Controller } from "react-hook-form";

import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

import { COLORS } from "../contants/color";
import { SPACING } from "../contants/spacing";
import { register } from "../services/auth.service";

// import { register } from "../services/auth.service";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      console.log("REGISTER DATA", data);

      await register(data.email, data.password);

      Alert.alert("Success", "Account created successfully");

      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Register Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: SPACING.xl,
        }}
      >
        {/* Logo */}

        <View
          style={{
            alignItems: "center",
            marginBottom: 48,
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: 200,
              height: 70,
              resizeMode: "contain",
            }}
          />

          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: COLORS.text,
              marginTop: SPACING.lg,
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              color: COLORS.textSecondary,
              marginTop: 8,
              fontSize: 14,
            }}
          >
            Sign up to get started
          </Text>
        </View>

        {/* Email */}

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
          }}
          render={({ field }) => (
            <AppInput
              label="Email"
              placeholder="Enter your email"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.email?.message}
            />
          )}
        />

        {/* Password */}

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field }) => (
            <AppInput
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              error={errors.password?.message}
            />
          )}
        />

        {/* Confirm Password */}

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <AppInput
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        {/* Register Button */}

        <AppButton
          title="Create Account"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />

        {/* Login */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <Text
            style={{
              color: COLORS.textSecondary,
            }}
          >
            Already have an account?
          </Text>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                marginLeft: 6,
                color: COLORS.primary,
                fontWeight: "600",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

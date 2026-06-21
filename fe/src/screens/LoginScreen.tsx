import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

import { login } from "../services/auth.service";
import { COLORS } from "../contants/color";
import { SPACING } from "../contants/spacing";

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const user = await login(data.email, data.password);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigation.replace("Main");
      console.log("LOGIN SUCCESS", user);
      Alert.alert("Success", `Welcome ${user.displayName}`);
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
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
            Welcome Back
          </Text>

          <Text
            style={{
              color: COLORS.textSecondary,

              marginTop: 8,

              fontSize: 14,
            }}
          >
            Sign in to continue
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

        {/* Forgot */}

        <TouchableOpacity
          style={{
            alignSelf: "flex-end",

            marginBottom: SPACING.lg,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,

              fontWeight: "500",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login */}

        <AppButton
          title="Sign In"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />

        {/* Divider */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            marginVertical: 24,
          }}
        >
          <View
            style={{
              flex: 1,

              height: 1,

              backgroundColor: COLORS.border,
            }}
          />

          <Text
            style={{
              marginHorizontal: 12,

              color: COLORS.textSecondary,
            }}
          >
            OR
          </Text>

          <View
            style={{
              flex: 1,

              height: 1,

              backgroundColor: COLORS.border,
            }}
          />
        </View>

        {/* Register */}

        <View
          style={{
            flexDirection: "row",

            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.textSecondary,
            }}
          >
            Don't have an account?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                marginLeft: 6,

                color: COLORS.primary,

                fontWeight: "600",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

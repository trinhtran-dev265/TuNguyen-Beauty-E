import { useEffect } from "react";

import { Image, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../contants/color";

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await AsyncStorage.getItem("user");

      setTimeout(() => {
        if (data) {
          navigation.replace("Main");
        } else {
          navigation.replace("Login");
        }
      }, 1500);
    } catch (error) {
      console.log(error);

      navigation.replace("Login");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 280,
          height: 100,
          resizeMode: "contain",
        }}
      />
    </View>
  );
}

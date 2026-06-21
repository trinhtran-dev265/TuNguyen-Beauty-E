import { ImageBackground, Text, View } from "react-native";

export default function BannerCard() {
  return (
    <ImageBackground
      source={require("../../../assets/images/banner1.png")}
      imageStyle={{
        borderRadius: 20,
      }}
      style={{
        height: 180,
        overflow: "hidden",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          width: "60%",
        }}
      ></View>
    </ImageBackground>
  );
}

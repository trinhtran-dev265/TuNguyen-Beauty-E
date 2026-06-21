import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Product } from "../types/product.type";

import { getProducts } from "../services/product.service";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/home/SearchBar";

import { COLORS } from "../contants/color";
import { SPACING } from "../contants/spacing";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function ProductListScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<any>();

  const { category } = route.params;

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      const filtered = category
        ? data.filter((item: Product) => item.category === category)
        : data;

      setProducts(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedProducts = products.filter(
    (product) =>
      product.isActive &&
      product.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      {/* Header */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.lg,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} />
          </TouchableOpacity>

          <Text
            style={{
              marginLeft: 16,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            {category || "All Products"}
          </Text>
        </View>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            onPress={() => navigation.navigate("Cart")}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING.lg,
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <>
            <SearchBar value={search} onChangeText={setSearch} />

            <View
              style={{
                marginTop: 20,
              }}
            ></View>

            <Text
              style={{
                marginTop: 24,
                marginBottom: 20,
                fontSize: 16,
                fontWeight: "600",
                color: "#666",
              }}
            >
              Showing Result {displayedProducts.length}
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", {
                productId: item.id,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

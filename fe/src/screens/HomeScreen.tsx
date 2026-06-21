import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Product } from "../types/product.type";
import { useNavigation } from "@react-navigation/native";
import { getProducts } from "../services/product.service";

import ProductCard from "../components/ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeHeader from "../components/home/HomeHeader";
import SearchBar from "../components/home/SearchBar";
import BannerCard from "../components/home/BannerCard";
import CategoryChip from "../components/home/CategoryChip";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SPACING } from "../contants/spacing";
import { COLORS } from "../contants/color";
import { MainStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState("Guest");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user");

    if (!data) return;

    const user = JSON.parse(data);

    setUserName(user.displayName);
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    return [...new Set(products.map((item) => item.category))];
  }, [products]);

  const displayedCategories = categories.slice(0, 8);

  const displayedProducts = products
    .filter(
      (p) => p.isActive && p.name.toLowerCase().includes(search.toLowerCase()),
    )
    .slice(0, 3);

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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F8FAF9",
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingHorizontal: SPACING.lg,
          paddingTop: 60,
        }}
      >
        <HomeHeader userName={userName} />

        <View
          style={{
            marginTop: 24,
          }}
        >
          <SearchBar value={search} onChangeText={setSearch} />
        </View>

        <View
          style={{
            marginTop: 24,
          }}
        >
          <BannerCard />
        </View>

        {/* Categories */}

        <View
          style={{
            marginTop: 32,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              Categories
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("CategoryList")}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "600",
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={displayedCategories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  marginRight: 12,
                }}
              >
                <CategoryChip
                  category={item}
                  onPress={() =>
                    navigation.navigate("ProductList", {
                      category: item,
                    })
                  }
                />
              </View>
            )}
          />
        </View>

        {/* Products */}

        <View
          style={{
            marginTop: 32,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              Best Selling
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductList", {
                  category: null,
                })
              }
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "600",
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={displayedProducts}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} />}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 30,

          padding: 24,

          borderRadius: 24,

          backgroundColor: "#0F5B4F",

          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "#FFF",

            fontSize: 24,

            fontWeight: "700",
          }}
        >
          Glow Naturally
        </Text>

        <Text
          style={{
            color: "#FFF",

            marginTop: 10,

            opacity: 0.8,
          }}
        >
          Discover skincare that loves your skin.
        </Text>
      </View>

      <View
        style={{
          height: 100,
        }}
      />
    </ScrollView>
  );
}

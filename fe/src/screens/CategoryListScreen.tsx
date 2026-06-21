import { useEffect, useState } from "react";

import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import CategoryCard from "../components/category/CategoryCard";

import { getProducts } from "../services/product.service";

import { Product } from "../types/product.type";

import { COLORS } from "../contants/color";
import { SPACING } from "../contants/spacing";

type CategoryItem = {
  name: string;
  count: number;
};

export default function CategoryListScreen() {
  const navigation = useNavigation<any>();

  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const products: Product[] = await getProducts();

      const categoryMap = new Map<string, number>();

      products.forEach((product) => {
        const currentCount = categoryMap.get(product.category) || 0;

        categoryMap.set(product.category, currentCount + 1);
      });

      const result: CategoryItem[] = Array.from(categoryMap.entries()).map(
        ([name, count]) => ({
          name,
          count,
        }),
      );

      result.sort((a, b) => a.name.localeCompare(b.name));

      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

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
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.lg,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: 16,
            fontSize: 24,
            fontWeight: "700",
            color: COLORS.text,
          }}
        >
          Categories
        </Text>
      </View>

      {/* List */}

      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          paddingHorizontal: SPACING.lg,
          paddingBottom: 40,
        }}
        renderItem={({ item }) => (
          <CategoryCard
            name={item.name}
            count={item.count}
            onPress={() =>
              navigation.navigate("ProductList", {
                category: item.name,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

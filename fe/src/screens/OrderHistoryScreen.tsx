import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

import { getMyOrders } from "../services/order.service";

import { Order } from "../types/order.type";

import { COLORS, ORDER_BACKGROUNDS } from "../contants/color";
import { SPACING } from "../contants/spacing";

const STATUS_STEP = {
  Pending: 1,

  Shipping: 2,

  Completed: 3,

  Cancelled: -1,
};

export default function OrderHistoryScreen() {
  const navigation = useNavigation<any>();

  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    if (!user) return;

    try {
      const response = await getMyOrders(user.uid);

      setOrders(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("vi-VN");
  };

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
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.lg,
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
          My Orders
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: SPACING.lg,
          paddingBottom: 40,
        }}
        renderItem={({ item, index }) => {
          const expanded = expandedId === item.id;
          const cardBackground =
            ORDER_BACKGROUNDS[index % ORDER_BACKGROUNDS.length];
          return (
            <View
              style={{
                backgroundColor: cardBackground,

                borderRadius: 20,

                marginBottom: 16,

                overflow: "hidden",

                borderWidth: 1,

                borderColor: COLORS.border,
              }}
            >
              {/* Summary */}

              <TouchableOpacity
                onPress={() => setExpandedId(expanded ? null : item.id)}
                style={{
                  padding: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "space-between",

                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.textSecondary,

                        fontSize: 14,
                      }}
                    >
                      Order #{item.id.slice(0, 8)}
                    </Text>

                    <Text
                      style={{
                        marginTop: 8,

                        color: COLORS.text,

                        fontWeight: "600",

                        fontSize: 15,
                      }}
                    >
                      Placed on {formatDate(item.createdAt)}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 36,

                      height: 36,

                      borderRadius: 10,

                      backgroundColor: COLORS.card,

                      justifyContent: "center",

                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={expanded ? "chevron-down" : "chevron-right"}
                      size={20}
                      color={COLORS.text}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {expanded && (
                <View
                  style={{
                    borderTopWidth: 1,

                    borderTopColor: COLORS.border,

                    padding: 18,
                  }}
                >
                  {/* Progress */}
                  <View
                    style={{
                      marginBottom: 24,
                    }}
                  >
                    {item.status === "Cancelled" ? (
                      <View
                        style={{
                          alignItems: "center",
                          paddingVertical: 12,
                        }}
                      >
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: COLORS.error,
                          }}
                        />

                        <Text
                          style={{
                            marginTop: 10,
                            color: COLORS.error,
                            fontWeight: "700",
                            fontSize: 14,
                          }}
                        >
                          Cancelled
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {["Ordered", "Shipping", "Completed"].map(
                          (step, index) => {
                            const currentStep =
                              STATUS_STEP[
                                item.status as keyof typeof STATUS_STEP
                              ];

                            const active = currentStep >= index + 1;

                            return (
                              <View
                                key={step}
                                style={{
                                  flex: 1,
                                  alignItems: "center",
                                }}
                              >
                                <View
                                  style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: active
                                      ? COLORS.primary
                                      : COLORS.border,
                                  }}
                                />

                                <Text
                                  style={{
                                    marginTop: 8,
                                    fontSize: 11,
                                    color: active
                                      ? COLORS.text
                                      : COLORS.textSecondary,
                                  }}
                                >
                                  {step}
                                </Text>
                              </View>
                            );
                          },
                        )}
                      </View>
                    )}
                  </View>
                  {/* Products */}
                  {item.products.map((product, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",

                        marginBottom: 16,

                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: `http://192.168.1.15:3000/uploads/products/${product.image}`,
                        }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 12,
                        }}
                      />

                      <View
                        style={{
                          flex: 1,

                          marginLeft: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "600",

                            color: COLORS.text,
                          }}
                        >
                          {product.name}
                        </Text>

                        <Text
                          style={{
                            marginTop: 4,

                            color: COLORS.textSecondary,

                            fontSize: 12,
                          }}
                        >
                          Quantity: {product.quantity}
                        </Text>
                      </View>
                    </View>
                  ))}
                  <View
                    style={{
                      marginTop: 8,

                      paddingTop: 16,

                      borderTopWidth: 1,

                      borderTopColor: COLORS.border,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,

                        fontWeight: "700",

                        color: COLORS.primary,
                      }}
                    >
                      Total: {item.total.toLocaleString()}đ
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 80,

              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="package-variant"
              size={80}
              color="#CCC"
            />

            <Text
              style={{
                marginTop: 12,

                color: "#666",
              }}
            >
              No orders yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

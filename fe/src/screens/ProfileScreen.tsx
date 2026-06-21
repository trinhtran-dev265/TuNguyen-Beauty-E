import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

import { COLORS } from "../contants/color";
import { SPACING } from "../contants/spacing";

const MENU_ITEMS = [
  {
    title: "My Profile",
    icon: "account-outline",
  },
  {
    title: "Returns & Refunds",
    icon: "cash-refund",
  },
  {
    title: "Manage Address",
    icon: "map-marker-outline",
  },
  {
    title: "Payment Methods",
    icon: "credit-card-outline",
  },
  {
    title: "Wallet",
    icon: "wallet-outline",
  },
  {
    title: "Invite Friends",
    icon: "account-group-outline",
  },
  {
    title: "Settings",
    icon: "cog-outline",
  },
  {
    title: "Support",
    icon: "lifebuoy",
  },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const { user, setUser } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("user");

          setUser(null);

          navigation.reset({
            index: 0,
            routes: [
              {
                name: "Login",
              },
            ],
          });
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFF6FB",
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

      <View
        style={{
          paddingTop: 70,
          paddingHorizontal: SPACING.lg,
          paddingBottom: 24,

          flexDirection: "row",

          alignItems: "center",

          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: COLORS.text,
          }}
        >
          My Account
        </Text>

        <TouchableOpacity
          style={{
            width: 40,
            height: 40,

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: SPACING.lg,
        }}
      >
        {/* Profile Card */}

        <View
          style={{
            backgroundColor: "#FFF",
            borderRadius: 20,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="account" size={36} color="#FFF" />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: COLORS.text,
              }}
            >
              Hello, {user?.displayName}
            </Text>

            <Text
              style={{
                color: COLORS.textSecondary,
                marginTop: 4,
              }}
            >
              {user?.email}
            </Text>

            <View
              style={{
                alignSelf: "flex-start",
                marginTop: 8,
                backgroundColor: "#FACC15",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                PRO
              </Text>
            </View>
          </View>

          <MaterialCommunityIcons
            name="pencil-outline"
            size={22}
            color={COLORS.textSecondary}
          />
        </View>

        {/* Quick Actions */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 18,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 18,
              alignItems: "center",
              marginRight: 8,
            }}
          >
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={24}
              color={COLORS.primary}
            />

            <Text
              style={{
                marginTop: 8,
                fontWeight: "600",
              }}
            >
              Voucher
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("OrderHistory")}
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 18,
              alignItems: "center",
              marginHorizontal: 4,
            }}
          >
            <MaterialCommunityIcons
              name="package-variant"
              size={24}
              color={COLORS.primary}
            />

            <Text
              style={{
                marginTop: 8,
                fontWeight: "600",
              }}
            >
              Orders
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 18,
              alignItems: "center",
              marginLeft: 8,
            }}
          >
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color={COLORS.primary}
            />

            <Text
              style={{
                marginTop: 8,
                fontWeight: "600",
              }}
            >
              Favorite
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu */}

        <View
          style={{
            marginTop: 22,
          }}
        >
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={{
                backgroundColor: "#FFF",
                borderRadius: 16,
                padding: 18,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={22}
                color={COLORS.text}
              />

              <Text
                style={{
                  flex: 1,
                  marginLeft: 14,
                  fontSize: 15,
                  fontWeight: "500",
                  color: COLORS.text,
                }}
              >
                {item.title}
              </Text>

              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          ))}

          {/* Logout */}

          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "#FFF",
              borderRadius: 16,
              padding: 18,
              marginTop: 8,
              marginBottom: 40,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="logout"
              size={22}
              color={COLORS.error}
            />

            <Text
              style={{
                marginLeft: 14,
                color: COLORS.error,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

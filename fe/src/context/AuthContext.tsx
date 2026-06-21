import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useContext, useEffect, useState } from "react";

import { User } from "../types/user";

type AuthContextType = {
  user: User | null;

  loading: boolean;

  setUser: (user: User | null) => void;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [user, setUserState] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");

      if (data) {
        setUserState(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setUser = async (user: User | null) => {
    setUserState(user);

    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem("user");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");

    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

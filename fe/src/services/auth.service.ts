import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

import { User } from "../types/user";

export const login = async (email: string, password: string): Promise<User> => {
  const credential = await signInWithEmailAndPassword(auth, email, password);

  const uid = credential.user.uid;

  const userRef = doc(db, "users", uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("Không tìm thấy tài khoản");
  }

  const userData = userSnap.data();

  if (userData.disabled) {
    throw new Error("Tài khoản đã bị khóa");
  }

  return {
    uid,
    email: userData.email ?? "",
    displayName: userData.displayName ?? "",
    role: userData.role ?? "Customer",
    disabled: userData.disabled ?? false,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
  };
};

export const register = async (
  email: string,
  password: string,
): Promise<User> => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const uid = credential.user.uid;

  const user: User = {
    uid,
    email,
    displayName: email.split("@")[0],
    role: "Customer",
    disabled: false,
  };

  await setDoc(doc(db, "users", uid), {
    ...user,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const getCurrentUser = async (): Promise<User | null> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return null;
  }

  const userRef = doc(db, "users", currentUser.uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  const userData = userSnap.data();

  return {
    uid: currentUser.uid,
    email: userData.email ?? "",
    displayName: userData.displayName ?? "",
    role: userData.role ?? "Customer",
    disabled: userData.disabled ?? false,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
  };
};

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "./firebase";

export const loginAdmin = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);

  const uid = credential.user.uid;

  const userRef = doc(db, "users", uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await signOut(auth);

    throw new Error("Không tìm thấy tài khoản");
  }

  const userData = userSnap.data();

  if (userData.disabled) {
    await signOut(auth);

    throw new Error("Tài khoản đã bị khóa");
  }

  const allowedRoles = ["Admin", "Manager", "Staff"];

  if (!allowedRoles.includes(userData.role)) {
    await signOut(auth);

    throw new Error("Không có quyền truy cập");
  }

  return {
    uid,

    ...userData,
  };
};

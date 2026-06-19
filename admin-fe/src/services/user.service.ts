import { api } from "./api";

export const getUsers = async () => {
  const response = await api.get("/users");

  return response.data;
};

export const createUser = async (data: {
  displayName: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("/users/create", data);

  return response.data;
};

export const updateUser = async (
  uid: string,
  data: {
    displayName?: string;
    email?: string;
    role?: string;
  },
) => {
  await api.patch(`/users/${uid}`, data);
};

export const updateStatus = async (uid: string, disabled: boolean) => {
  await api.patch(`/users/${uid}/status`, { disabled });
};

export const deleteUser = async (uid: string) => {
  await api.delete(`/users/${uid}`);
};

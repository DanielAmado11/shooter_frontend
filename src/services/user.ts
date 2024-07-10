import { getClientAxiosInstance } from "@/config/clientAxiosInstance";
import { User } from "@/interfaces/user";

const AxiosInstance = getClientAxiosInstance();

const getUser = async (id: number) => {
  const response = await AxiosInstance.get(`/user`);
  return response;
};

const createAccount = async (data: User) => {
  const response = await AxiosInstance.post("/user", data);
  return response.data;
};

const changeAvatar = async (id: number) => {
  const response = await AxiosInstance.put("/user", { avatar_id: id });
  return response.data;
};

const getAccount = async (code: string) => {
  const response = await AxiosInstance.post("/login", { code });
  return response.data;
};

const logout = async () => {
  const response = await AxiosInstance.post("/logout");
  return response.data;
};

export { getUser, createAccount, changeAvatar, getAccount, logout };

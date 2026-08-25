import { getClientAxiosInstance } from "@/config/clientAxiosInstance";
import { User } from "@/interfaces/user";

const AxiosInstance = getClientAxiosInstance({ withFiles: false });

const getUser = async () => {
  const AxiosInstanceAuth = getClientAxiosInstance({ withFiles: false });
  const response = await AxiosInstanceAuth.get(`/user`);
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

const getUserData = async (username: string) => {
  const response = await AxiosInstance.get(`/user/data/${username}`);
  console.log(response.data);
  return response.data;
};

const updateComment = async (comment: string) => {
  const response = await AxiosInstance.put("/user/comment", { comment });
  return response.data;
};

export {
  getUser,
  createAccount,
  changeAvatar,
  getAccount,
  logout,
  getUserData,
  updateComment,
};

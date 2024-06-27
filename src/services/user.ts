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

export { getUser, createAccount };

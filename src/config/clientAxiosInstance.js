import axios from "axios";

export const getClientAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.PUBLIC_API_URL,
    withCredentials: true,
  });

  return instance;
};

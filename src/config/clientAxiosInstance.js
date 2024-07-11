import axios from "axios";
import Cookies from "js-cookie";

export const getClientAxiosInstance = () => {
  const user_code = Cookies.get("user_code");
  const instance = axios.create({
    baseURL: process.env.PUBLIC_API_URL,
    withCredentials: true,
    // add cookie user_code to all requests
    headers: {
      "Content-Type": "application/json",
      user_code: user_code,
    },
  });

  return instance;
};

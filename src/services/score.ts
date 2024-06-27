import { getClientAxiosInstance } from "@/config/clientAxiosInstance";
import { Score } from "@/interfaces/score";

const AxiosInstance = getClientAxiosInstance();

const getScore = async () => {
  const response = await AxiosInstance.get(`/score`);
  return response;
};

const createScore = async (data: Score) => {
  const response = await AxiosInstance.post("/score", data);
  return response.data;
};

export { getScore, createScore };

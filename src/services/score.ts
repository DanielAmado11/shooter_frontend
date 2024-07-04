import { getClientAxiosInstance } from "@/config/clientAxiosInstance";
import { Score } from "@/interfaces/score";

const AxiosInstance = getClientAxiosInstance();

const getScores = async () => {
  const response = await AxiosInstance.get(`/score`);
  return response.data;
};

const getScore = async () => {
  const response = await AxiosInstance.get(`/score/self`);
  return response.data;
};

const createScore = async (data: Score) => {
  const response = await AxiosInstance.post("/score", data);
  return response.data;
};

export { getScores, createScore, getScore };

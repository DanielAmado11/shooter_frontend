import { getClientAxiosInstance } from "@/config/clientAxiosInstance";
import { Match, MatchState, Shot } from "@/interfaces/match";

const AxiosInstance = getClientAxiosInstance({ withFiles: false });

export const MATCH_POLL_INTERVAL = 1500;

const createMatch = async () => {
  const response = await AxiosInstance.post("/match");
  return response.data as { code: string; match: Match };
};

const joinMatch = async (code: string) => {
  const response = await AxiosInstance.post("/match/join", { code });
  return response.data as Match;
};

const getMatch = async (id: number) => {
  const response = await AxiosInstance.get(`/match/${id}`);
  const data = response.data as MatchState;
  return data;
};

const recordShot = async (id: number, shot: Shot) => {
  const response = await AxiosInstance.post(`/match/${id}/shot`, shot);
  return response.data as { match: Match; winnerId: number | null; goals1: number; goals2: number };
};

const finishMatch = async (id: number) => {
  const response = await AxiosInstance.post(`/match/${id}/result`);
  return response.data as { match: Match; winnerId: number | null };
};

export { createMatch, joinMatch, getMatch, recordShot, finishMatch };

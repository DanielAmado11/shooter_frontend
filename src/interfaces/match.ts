export interface Shot {
  playerId: number;
  shootType: string;
  direction: string;
  force: number;
  keeperAction: string;
  result: "goal" | "saved" | "post" | "miss";
}

export interface Player {
  id: number;
  name: string;
  avatar_id: number;
}

export interface Match {
  id: number;
  code: string;
  player1_id: number;
  player2_id: number | null;
  status: "waiting" | "playing" | "finished";
  currentPlayerId: number;
  shots: Shot[];
  shotsPerPlayer: number;
  winnerId: number | null;
}

export interface MatchState {
  match: Match;
  player1: Player | null;
  player2: Player | null;
  goals1: number;
  goals2: number;
}

export interface OpponentStat {
  id: number;
  name: string;
  avatar_id: number;
  games: number;
  wins: number;
  losses: number;
  lossPercent: number;
}

export interface MatchStats {
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  opponents: OpponentStat[];
}

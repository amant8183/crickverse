import type { Player } from "../types/player";

export interface UserTeam {
  id: string;
  players: Player[];
  captainId: string;
  viceCaptainId: string;
}

import type { Player } from "./player";

export interface SavedTeam {
  players: Player[];
  captainId: number | null;
  viceCaptainId: number | null;
  createdAt: string;
}

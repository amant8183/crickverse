import type { Player } from "../types/player";

export const countByTeam = (players: Player[], shortName: string): number =>
  players.filter(p => p.team_short_name === shortName).length;

export const countByRole = (players: Player[], role: string): number =>
  players.filter(p => p.role === role).length;

export const totalCredits = (players: Player[]): number =>
  players.reduce((sum, p) => sum + p.event_player_credit, 0);

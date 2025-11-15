export interface Player {
  id: number;
  player_id: string;
  name: string;
  role: "Batsman" | "Bowler" | "All-Rounder" | "Wicket-Keeper";
  short_name: string;
  team_name: string;
  team_short_name: string;
  team_logo: string;
  event_total_points: number;
  event_player_credit: number;
  is_playing: boolean;
}

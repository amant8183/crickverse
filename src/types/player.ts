export interface Player {
  id: string;
  name: string;
  role: "BAT" | "BOWL" | "AR" | "WK";
  team_name: string;
  points: number;
  credits: number;
}

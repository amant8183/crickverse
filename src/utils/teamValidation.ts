import type { Player } from "../types/player";
import { countByTeam, countByRole, totalCredits } from "./playerCounts";

export const canSelectPlayer = (
  player: Player,
  selected: Player[]
): boolean => {
  // If selected → allow unselect
  if (selected.some(p => p.id === player.id)) return true;

  if (selected.length >= 11) return false;

  if (totalCredits(selected) + player.event_player_credit > 100) return false;

  if (countByTeam(selected, player.team_short_name) >= 7) return false;

  const role = player.role;

  if (role === "Batsman" && countByRole(selected, "Batsman") >= 7) return false;
  if (role === "Bowler" && countByRole(selected, "Bowler") >= 7) return false;
  if (role === "All-Rounder" && countByRole(selected, "All-Rounder") >= 4) return false;
  if (role === "Wicket-Keeper" && countByRole(selected, "Wicket-Keeper") >= 5) return false;

  return true;
};

export const isFinalTeamValid = (selected: Player[]): boolean => {
  return (
    selected.length === 11 &&
    countByRole(selected, "Batsman") >= 3 &&
    countByRole(selected, "Bowler") >= 3 &&
    countByRole(selected, "Wicket-Keeper") >= 1 &&
    totalCredits(selected) <= 100 &&
    countByTeam(selected, "MS") <= 7 &&
    countByTeam(selected, "PS") <= 7
  );
};

import type { Player } from "../types/player";
import { countByTeam, countByRole, totalCredits } from "./playerCounts";

export const getTeamValidationErrors = (selected: Player[]): string[] => {
  const errors: string[] = [];

  if (selected.length < 11)
    errors.push(`Select ${11 - selected.length} more players`);

  const bats = countByRole(selected, "Batsman");
  const bowls = countByRole(selected, "Bowler");
  const wks = countByRole(selected, "Wicket-Keeper");
  const ar = countByRole(selected, "All-Rounder");

  if (bats < 3) errors.push("Need at least 3 Batsmen");
  if (bowls < 3) errors.push("Need at least 3 Bowlers");
  if (wks < 1) errors.push("Need at least 1 Wicket-Keeper");

  if (bats > 7) errors.push("Max 7 Batsmen allowed");
  if (bowls > 7) errors.push("Max 7 Bowlers allowed");
  if (wks > 5) errors.push("Max 5 Wicket-Keepers allowed");
  if (ar > 4) errors.push("Max 4 All-Rounders allowed");

  const ms = countByTeam(selected, "MS");
  const ps = countByTeam(selected, "PS");

  if (ms > 7) errors.push("Max 7 players allowed from Melbourne Stars (MS)");
  if (ps > 7) errors.push("Max 7 players allowed from Perth Scorchers (PS)");

  if (totalCredits(selected) > 100)
    errors.push("Credits exceed 100");

  return errors;
};

export const canSelectPlayer = (
  player: Player,
  selected: Player[]
): boolean => {
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

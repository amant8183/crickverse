import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import type { Player } from "../../types/player";
import { getPlayers } from "../../api/players";
import {
  canSelectPlayer,
  getTeamValidationErrors,
} from "../../utils/teamValidation";

import PlayerCard from "../../components/PlayerCard";

export default function PickPlayers() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [players, setPlayers] = useState<Player[]>([]);
  const [selected, setSelected] = useState<Player[]>(state?.players ?? []);
  const [roleFilter, setRoleFilter] = useState("Wicket-Keeper");
  const [teamFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const errors = getTeamValidationErrors(selected);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data);
        setError(null);
      } catch (err) {
        console.error("Error loading players:", err);
        setError("Could not load players. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [matchId]);

  const toggle = (p: Player) => {
    const exists = selected.some((x) => x.id === p.id);

    if (exists) {
      setSelected(selected.filter((x) => x.id !== p.id));
      return;
    }

    if (canSelectPlayer(p, selected)) {
      setSelected([...selected, p]);
    }
  };

  const teamOptions = Array.from(
    new Set(players.map((p) => p.team_short_name)),
  );

  const visible = players
    .filter((p) => p.role === roleFilter)
    .filter((p) =>
      teamFilter === "ALL" ? true : p.team_short_name === teamFilter,
    );

  const batsmen = selected.filter((p) => p.role === "Batsman").length;
  const bowlers = selected.filter((p) => p.role === "Bowler").length;
  const allRounders = selected.filter((p) => p.role === "All-Rounder").length;
  const keepers = selected.filter((p) => p.role === "Wicket-Keeper").length;
  const creditsLeft =
    100 - selected.reduce((sum, p) => sum + p.event_player_credit, 0);

  const team1 = teamOptions[0] || "";
  const team2 = teamOptions[1] || "";
  const team1Logo =
    players.find((p) => p.team_short_name === team1)?.team_logo || "";
  const team2Logo =
    players.find((p) => p.team_short_name === team2)?.team_logo || "";
  const team1Count = selected.filter((p) => p.team_short_name === team1).length;
  const team2Count = selected.filter((p) => p.team_short_name === team2).length;

  return (
    <div className="h-screen pt-14 min-h-0 flex flex-col bg-[var(--color-bgPrimary)]">
      {/* Header */}
      <div className="flex-shrink-0 bg-[var(--color-primary)] px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-white">Select Players</h1>
      </div>

      {/* Team Info */}
      <div className="flex-shrink-0 bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          {/* Team Logos */}
          <div className="flex items-center gap-3">
            {team1Logo && (
              <div className="relative">
                <img
                  src={team1Logo}
                  alt={team1}
                  className="w-14 h-14 rounded-full bg-white p-1"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {team1Count}
                </span>
                <p className="text-[10px] text-center text-gray-300 mt-1 font-semibold">
                  {team1}
                </p>
              </div>
            )}

            {team2Logo && (
              <div className="relative">
                <img
                  src={team2Logo}
                  alt={team2}
                  className="w-14 h-14 rounded-full bg-white p-1"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {team2Count}
                </span>
                <p className="text-[10px] text-center text-gray-300 mt-1 font-semibold">
                  {team2}
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-col items-end">
            <p className="text-[10px] text-gray-400">
              Max 7 players from a team
            </p>
            <div className="flex items-center gap-4 mt-1">
              <div className="text-center">
                <p className="text-xl font-bold text-white">
                  {selected.length}/11
                </p>
                <p className="text-[10px] text-gray-400">Players</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">
                  {creditsLeft.toFixed(1)}
                </p>
                <p className="text-[10px] text-gray-400">Credits Left</p>
              </div>
            </div>
          </div>
        </div>

        {/* Player Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: 11 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                idx < selected.length
                  ? "bg-[var(--color-accentRed)] text-white"
                  : "bg-gray-700 text-gray-500"
              }`}
            >
              {idx < selected.length ? idx + 1 : ""}
            </div>
          ))}
        </div>
      </div>

      {/* Role Tabs */}
      <div className="flex-shrink-0 bg-white border-b border-[var(--color-textSubtle)]/10">
        <div className="flex">
          <button
            onClick={() => setRoleFilter("Wicket-Keeper")}
            className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              roleFilter === "Wicket-Keeper"
                ? "border-[var(--color-accentRed)] text-gray-900"
                : "border-transparent text-[var(--color-textSecondary)]"
            }`}
          >
            WK ({keepers})
          </button>

          <button
            onClick={() => setRoleFilter("Batsman")}
            className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              roleFilter === "Batsman"
                ? "border-[var(--color-accentRed)] text-gray-900"
                : "border-transparent text-[var(--color-textSecondary)]"
            }`}
          >
            Batsman ({batsmen})
          </button>

          <button
            onClick={() => setRoleFilter("All-Rounder")}
            className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              roleFilter === "All-Rounder"
                ? "border-[var(--color-accentRed)] text-gray-900"
                : "border-transparent text-[var(--color-textSecondary)]"
            }`}
          >
            AR ({allRounders})
          </button>

          <button
            onClick={() => setRoleFilter("Bowler")}
            className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              roleFilter === "Bowler"
                ? "border-[var(--color-accentRed)] text-gray-900"
                : "border-transparent text-[var(--color-textSecondary)]"
            }`}
          >
            Bowler ({bowlers})
          </button>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="flex-shrink-0 bg-white border-t border-[var(--color-textDim)]/10 px-4 py-3">
          <div className="bg-bgwhite border border-[var(--color-textDim)]/20 rounded-lg p-2">
            <ul className="text-textDim text[10px] space-y-0.5">
              {errors.map((error, idx) => (
                <li key={idx}>• {error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="flex-shrink-0 bg-white border-t border-[var(--color-textSubtle)]/10">
        <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-300">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
            <span className="flex-1">Player</span>
            <span className="w-16 text-center">Points</span>
            <span className="w-16 text-center">Credits</span>
            <span className="w-10"></span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER - SCROLLABLE AREA */}
      <div className="flex-1 min-h-0 flex flex-col bg-white">
        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto bg-white px-4 py-3">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="mx-4 mt-4 flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          {!loading && !error && visible.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-[var(--color-textSecondary)]">
                No players available
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            visible.map((p) => (
              <PlayerCard
                key={p.id}
                player={p}
                selected={selected.some((x) => x.id === p.id)}
                onToggle={toggle}
              />
            ))}
        </div>
      </div>

      {/* Save Team Button */}
      <div className="flex-shrink-0 bg-white px-4 py-3 border-t border-[var(--color-textSubtle)]/10">
        <div className="flex gap-3">
          <button
            disabled={errors.length > 0}
            onClick={() =>
              navigate(`/captain/${matchId}`, {
                state: {
                  players: selected,
                  captainId: state?.captainId ?? null,
                  viceCaptainId: state?.viceCaptainId ?? null,
                },
              })
            }
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold ${
              errors.length === 0
                ? "bg-[var(--color-accentRed)] text-white"
                : "bg-[var(--color-textSubtle)]/20 text-[var(--color-textSubtle)] cursor-not-allowed"
            }`}
          >
            Save Team
          </button>
        </div>
      </div>
    </div>
  );
}

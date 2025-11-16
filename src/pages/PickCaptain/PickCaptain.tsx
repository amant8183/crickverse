import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import CaptainCard from "../../components/CaptainCard";
import CaptainSummary from "../../components/CaptainSummary";
import { isCaptainSelectionValid } from "../../utils/captainValidation";
import type { Player } from "../../types/player";

export default function PickCaptain() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { matchId } = useParams();

  if (!state || !state.players || state.players.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--color-bgPrimary)]">
        <div className="text-center text-red-600 font-semibold">
          ⚠️ No team found. Please pick your players again.
        </div>
      </div>
    );
  }

  const players: Player[] = state.players;

  const [captainId, setCaptainId] = useState<number | null>(
    state?.captainId ?? null,
  );
  const [viceCaptainId, setViceCaptainId] = useState<number | null>(
    state?.viceCaptainId ?? null,
  );

  const captain = players.find((p) => p.id === captainId) ?? null;
  const viceCaptain = players.find((p) => p.id === viceCaptainId) ?? null;

  const teamOptions = Array.from(
    new Set(players.map((p) => p.team_short_name)),
  );
  const team1 = teamOptions[0] || "";
  const team2 = teamOptions[1] || "";
  const team1Logo =
    players.find((p) => p.team_short_name === team1)?.team_logo || "";
  const team2Logo =
    players.find((p) => p.team_short_name === team2)?.team_logo || "";
  const team1Count = players.filter((p) => p.team_short_name === team1).length;
  const team2Count = players.filter((p) => p.team_short_name === team2).length;

  const handleConfirm = () => {
    if (!isCaptainSelectionValid(captainId, viceCaptainId)) {
      alert("Select a valid Captain & Vice Captain!");
      return;
    }

    navigate(`/teams/${matchId}`, {
      state: {
        players,
        captainId,
        viceCaptainId,
      },
    });
  };

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
        <h1 className="text-lg font-semibold text-white">
          Pick Captain & Vice-Captain
        </h1>
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

          {/* Summary */}
          <div className="flex-shrink-0 px-4 py-3">
            <CaptainSummary captain={captain} viceCaptain={viceCaptain} />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto bg-white">
          {players.map((player) => (
            <CaptainCard
              key={player.id}
              player={player}
              captainId={captainId}
              viceCaptainId={viceCaptainId}
              onSetCaptain={setCaptainId}
              onSetViceCaptain={setViceCaptainId}
            />
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex-shrink-0 bg-white px-4 py-3 border-t border-[var(--color-textSubtle)]/10">
        <button
          disabled={!isCaptainSelectionValid(captainId, viceCaptainId)}
          onClick={handleConfirm}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold ${
            isCaptainSelectionValid(captainId, viceCaptainId)
              ? "bg-[var(--color-accentRed)] text-white"
              : "bg-[var(--color-textSubtle)]/20 text-[var(--color-textSubtle)] cursor-not-allowed"
          }`}
        >
          Confirm Team
        </button>
      </div>
    </div>
  );
}

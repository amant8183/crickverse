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

  // 🔥 SAFETY CHECK — Prevent blank white screen
  if (!state || !state.players || state.players.length === 0) {
    return (
      <div className="p-4 text-center text-red-700 font-semibold">
        ⚠️ No team found. Please pick your players again.
      </div>
    );
  }

  const players: Player[] = state.players;

  const [captainId, setCaptainId] = useState<number | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<number | null>(null);

  const captain = players.find((p: Player) => p.id === captainId) ?? null;
  const viceCaptain = players.find((p: Player) => p.id === viceCaptainId) ?? null;

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Pick Captain & Vice-Captain</h1>

      <CaptainSummary captain={captain} viceCaptain={viceCaptain} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {players.map((player: Player) => (
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

      <button
        disabled={!isCaptainSelectionValid(captainId, viceCaptainId)}
        onClick={handleConfirm}
        className={`mt-6 w-full py-3 rounded-xl text-lg ${
          isCaptainSelectionValid(captainId, viceCaptainId)
            ? "bg-blue-600 text-white"
            : "bg-gray-400 text-gray-200"
        }`}
      >
        Confirm Team
      </button>
    </div>
  );
}

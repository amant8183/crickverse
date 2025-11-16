// CurrentTeam.tsx
import type { Player } from "../../types/player";

interface Props {
  players: Player[];
  captainId: number | null;
  viceCaptainId: number | null;
  onSave: () => void;
}

export default function CurrentTeam({ players, captainId, viceCaptainId, onSave }: Props) {
  if (players.length === 0) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-4 text-center text-gray-500">
        <p className="text-sm">No players selected for this team.</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
        <h2 className="text-sm font-semibold text-gray-900">
          Current Team ({players.length}/11)
        </h2>
      </div>

      {/* Player list */}
      <div className="divide-y divide-gray-200">
        {players.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            {/* Player Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {p.name}
              </p>

              <p className="text-[11px] text-gray-500">
                {p.team_short_name} •{" "}
                {p.role === "All-Rounder"
                  ? "AR"
                  : p.role === "Wicket-Keeper"
                  ? "WK"
                  : p.role === "Batsman"
                  ? "Bat"
                  : "Bowl"}
              </p>
            </div>

            {/* Captain / VC badges */}
            <div className="flex gap-2 ml-3">
              {p.id === captainId && (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-600 text-white text-xs font-bold">
                  C
                </span>
              )}

              {p.id === viceCaptainId && (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-blue-600 text-white text-xs font-bold">
                  VC
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={onSave}
        className="w-full px-4 py-3 bg-[var(--color-accentRed)] text-white font-semibold hover:opacity-90 transition-colors"
      >
        Save Team
      </button>
    </div>
  );
}

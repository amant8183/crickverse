import type { Player } from "../types/player";

interface Props {
  player: Player;
  captainId: number | null;
  viceCaptainId: number | null;
  onSetCaptain: (id: number) => void;
  onSetViceCaptain: (id: number) => void;
}

export default function CaptainCard({
  player,
  captainId,
  viceCaptainId,
  onSetCaptain,
  onSetViceCaptain,
}: Props) {
  const isCaptain = captainId === player.id;
  const isViceCaptain = viceCaptainId === player.id;

  return (
    <div
      className="w-full flex items-center justify-between px-4 py-3 border-b border-[var(--color-textSubtle)]/20 hover:bg-[var(--color-bgSecondary)]/50 transition-colors text-left bg-white"
    >
      {/* Player Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Team Logo */}
        <div className="relative flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg p-1.5 flex items-center justify-center">
          <img 
            src={player.team_logo} 
            alt={player.team_short_name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name & Team */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {player.name}
          </p>
          <p className="text-[11px] text-gray-500">
            {player.team_short_name} - {player.role === "All-Rounder" ? "AR" : 
                                        player.role === "Wicket-Keeper" ? "WK" :
                                        player.role === "Batsman" ? "Bat" : "Bowl"}
          </p>
        </div>
      </div>

      {/* Captain Button */}
      <button
        onClick={() => onSetCaptain(player.id)}
        disabled={isViceCaptain}
        className={`w-10 h-10 rounded border-2 flex items-center justify-center mx-1 transition-colors ${
          isCaptain
            ? "bg-green-600 border-green-600"
            : "border-gray-400 hover:border-gray-500"
        } ${isViceCaptain ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {isCaptain && (
          <span className="text-xs font-bold text-white">C</span>
        )}
      </button>

      {/* Vice Captain Button */}
      <button
        onClick={() => onSetViceCaptain(player.id)}
        disabled={isCaptain}
        className={`w-10 h-10 rounded border-2 flex items-center justify-center transition-colors ${
          isViceCaptain
            ? "bg-blue-600 border-blue-600"
            : "border-gray-400 hover:border-gray-500"
        } ${isCaptain ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {isViceCaptain && (
          <span className="text-xs font-bold text-white">VC</span>
        )}
      </button>
    </div>
  );
}

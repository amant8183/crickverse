import type { Player } from "../types/player";

export default function PlayerCard({
  player,
  selected,
  onToggle,
}: {
  player: Player;
  selected: boolean;
  onToggle: (p: Player) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(player)}
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
            {player.team_short_name} -{" "}
            {player.role === "All-Rounder"
              ? "WK"
              : player.role === "Wicket-Keeper"
                ? "WK"
                : player.role === "Batsman"
                  ? "Bat"
                  : "Bowl"}
          </p>
        </div>
      </div>

      {/* Points */}
      <div className="w-16 text-center">
        <p className="text-sm font-semibold text-gray-900">
          {Math.floor(Math.random() * 100)}
        </p>
      </div>

      {/* Credits */}
      <div className="w-16 text-center">
        <p className="text-sm font-semibold text-gray-900">
          {player.event_player_credit}
        </p>
      </div>

      {/* Checkbox */}
      <div className="w-10 flex justify-center">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            selected
              ? "bg-[var(--color-accentRed)] border-[var(--color-accentRed)]"
              : "border-gray-400"
          }`}
        >
          {selected && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

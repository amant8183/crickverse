import type { Player } from "../types/player";

export default function CaptainSummary({
  captain,
  viceCaptain,
}: {
  captain: Player | null;
  viceCaptain: Player | null;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-textSecondary">Captain</p>
          <p className="text-sm font-semibold text-textPrimary">
            {captain?.name ?? "Not Selected"}
          </p>
        </div>
        {captain && (
          <img
            src={captain.team_logo}
            alt={captain.team_short_name}
            className="w-10 h-10 rounded-full bg-gray-100 p-1"
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-textSecondary">Vice Captain</p>
          <p className="text-sm font-semibold text-textPrimary">
            {viceCaptain?.name ?? "Not Selected"}
          </p>
        </div>
        {viceCaptain && (
          <img
            src={viceCaptain.team_logo}
            alt={viceCaptain.team_short_name}
            className="w-10 h-10 rounded-full bg-gray-100 p-1"
          />
        )}
      </div>
    </div>
  );
}

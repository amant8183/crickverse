import { totalCredits, countByRole } from "../utils/playerCounts";
import type { Player } from "../types/player";

interface SelectionSummaryProps {
  selected: Player[];
}

const MAX_PLAYERS = 11;
const MAX_CREDITS = 100;

export default function SelectionSummary({ selected }: SelectionSummaryProps) {
  const creditsUsed = totalCredits(selected);
  const creditsLeft = Math.max(0, MAX_CREDITS - creditsUsed);

  const batsmen = countByRole(selected, "Batsman");
  const bowlers = countByRole(selected, "Bowler");
  const allRounders = countByRole(selected, "All-Rounder");
  const keepers = countByRole(selected, "Wicket-Keeper");

  const creditsPercentage = (creditsLeft / MAX_CREDITS) * 100;

  return (
    <div className="bg-[var(--color-bgPrimary)] border border-[var(--color-textSubtle)]/10 rounded-xl p-3 space-y-2.5">
      {/* Players Selected */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-[var(--color-textSecondary)]">
          Players Selected
        </span>
        <span
          className={`text-base font-bold ${
            selected.length === MAX_PLAYERS
              ? "text-green-600"
              : selected.length > MAX_PLAYERS
                ? "text-red-600"
                : "text-[var(--color-textPrimary)]"
          }`}
        >
          {selected.length} / {MAX_PLAYERS}
        </span>
      </div>

      {/* Credits Progress */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-semibold text-[var(--color-textSecondary)]">
            Credits Remaining
          </span>
          <span
            className={`text-base font-bold ${
              creditsLeft < 10
                ? "text-red-600"
                : creditsLeft < 30
                  ? "text-orange-600"
                  : "text-[var(--color-textPrimary)]"
            }`}
          >
            {creditsLeft.toFixed(1)} / {MAX_CREDITS}
          </span>
        </div>
        <div className="h-1.5 bg-[var(--color-textSubtle)]/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              creditsLeft < 10
                ? "bg-red-500"
                : creditsLeft < 30
                  ? "bg-orange-500"
                  : "bg-blue-500"
            }`}
            style={{ width: `${Math.min(creditsPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Role Distribution */}
      <div className="flex justify-around items-center pt-2 border-t border-[var(--color-textSubtle)]/10">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[var(--color-textSecondary)]">
            🏏 BAT
          </span>
          <span className="text-lg font-bold text-[var(--color-textPrimary)]">
            {batsmen}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[var(--color-textSecondary)]">
            🎯 AR
          </span>
          <span className="text-lg font-bold text-[var(--color-textPrimary)]">
            {allRounders}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[var(--color-textSecondary)]">
            ⚾ BOWL
          </span>
          <span className="text-lg font-bold text-[var(--color-textPrimary)]">
            {bowlers}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[var(--color-textSecondary)]">
            🧤 WK
          </span>
          <span className="text-lg font-bold text-[var(--color-textPrimary)]">
            {keepers}
          </span>
        </div>
      </div>
    </div>
  );
}

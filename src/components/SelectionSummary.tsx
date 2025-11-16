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

  return (
    <div className="bg-gray-100 p-3 rounded-lg mt-3 space-y-2 text-sm md:text-base">
      <div className="flex justify-between">
        <span>
          Players: {selected.length} / {MAX_PLAYERS}
        </span>
        <span>
          Credits Left: {creditsLeft.toFixed(1)} / {MAX_CREDITS}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-700">
        <span>BAT {batsmen}</span>
        <span>AR {allRounders}</span>
        <span>BOWL {bowlers}</span>
        <span>WK {keepers}</span>
      </div>
    </div>
  );
}

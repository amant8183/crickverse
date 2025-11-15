import { totalCredits } from "../utils/playerCounts";
import type { Player } from '../types/player.tsx';
interface SelectionSummaryProps {
  selected: Player[];
}
export default function SelectionSummary({ selected }: SelectionSummaryProps) {
  return (
    <div className="flex justify-between bg-gray-100 p-3 rounded-lg mt-3">
      <span>Players: {selected.length} / 11</span>
      <span>Credits Used: {totalCredits(selected).toFixed(1)} / 100</span>
    </div>
  );
}

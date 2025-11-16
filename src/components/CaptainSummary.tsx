import type { Player } from "../types/player";

export default function CaptainSummary({
  captain,
  viceCaptain,
}: {
  captain: Player | null;
  viceCaptain: Player | null;
}) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg mb-4">
      <div><strong>Captain:</strong> {captain?.name ?? "None"}</div>
      <div><strong>Vice Captain:</strong> {viceCaptain?.name ?? "None"}</div>
    </div>
  );
}

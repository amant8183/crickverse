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
      <div className="p-3 bg-gray-100 rounded-lg mb-4 text-gray-500">
        No players selected for this team.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-3 rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-2">Current Team</h2>

      {players.map((p) => (
        <div key={p.id} className="flex justify-between p-2 border-b">
          <span>
            {p.short_name} ({p.role})
          </span>

          {p.id === captainId && <span className="text-blue-600 font-bold">⭐ C</span>}
          {p.id === viceCaptainId && <span className="text-green-600 font-bold">🌟 VC</span>}
        </div>
      ))}

      <button
        onClick={onSave}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl"
      >
        Save Team
      </button>
    </div>
  );
}

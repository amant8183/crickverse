import type { SavedTeam } from "../../types/myTeams";
import type { Player } from "../../types/player";

interface Props {
  teams: SavedTeam[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function SavedTeamList({ teams, onEdit, onDelete }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Saved Teams</h2>

      {teams.length === 0 && <p>No saved teams yet.</p>}

      {teams.map((team, index) => (
        <div key={index} className="border p-3 rounded-lg mb-3">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="font-bold">Team #{index + 1}</h3>
              <p className="text-sm text-gray-600">
                Saved: {new Date(team.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(index)}
                className="px-3 py-1 text-xs rounded-lg bg-blue-600 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="px-3 py-1 text-xs rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>

          <ul className="mt-2">
            {team.players.map((p: Player) => (
              <li key={p.id} className="flex justify-between border-b py-1">
                {p.short_name}

                {p.id === team.captainId && <span>⭐ C</span>}
                {p.id === team.viceCaptainId && <span>🌟 VC</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

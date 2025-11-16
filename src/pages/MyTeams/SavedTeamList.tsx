import type { SavedTeam } from "../../types/myTeams";

interface Props {
  teams: SavedTeam[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function SavedTeamList({ teams, onEdit, onDelete }: Props) {
  if (teams.length === 0) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-4 text-center text-gray-500">
        <p className="text-sm">No saved teams yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {teams.map((team, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
            <p className="text-sm font-semibold text-gray-900">
              Saved Team {index + 1}
            </p>
            <p className="text-[11px] text-gray-500">
              {new Date(team.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Player Count */}
          <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
            Players: {team.players.length}/11
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between px-4 py-3 bg-white">
            <button
              onClick={() => onEdit(index)}
              className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:opacity-90"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(index)}
              className="px-3 py-1.5 bg-accentRed text-white text-xs font-semibold rounded-md hover:opacity-90"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

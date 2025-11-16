import type { SavedTeam } from "../../types/myTeams";
import type { Player } from "../../types/player";

interface Props {
  teams: SavedTeam[];
}

export default function SavedTeamList({ teams }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Saved Teams</h2>

      {teams.length === 0 && <p>No saved teams yet.</p>}

      {teams.map((team, index) => (
        <div key={index} className="border p-3 rounded-lg mb-3">
          <h3 className="font-bold">Team #{index + 1}</h3>
          <p className="text-sm text-gray-600">
            Saved: {new Date(team.createdAt).toLocaleString()}
          </p>

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

import { useEffect, useState } from "react";
import { getUpcomingMatches } from "../../api/matches.ts";
import type { Match } from "../../types/match.ts";
import MatchCard from "../../components/MatchCard.tsx";
import { useNavigate } from "react-router-dom";

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getUpcomingMatches();
        console.log("FINAL MATCHES:", data);
        setMatches(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <div>Loading matches...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Matches</h1>

      {matches.map((match) => (
        <div key={match.id} className="mb-4">
          <MatchCard
            match={match}
            onClick={() => navigate(`/pick-players/${match.id}`)}
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => navigate(`/pick-players/${match.id}`)}
              className="px-3 py-1 text-sm rounded-lg border border-white bg-purple-600 text-white shadow"
            >
              Create Team
            </button>
            <button
              onClick={() => navigate(`/teams/${match.id}`)}
              className="px-3 py-1 text-sm rounded-lg bg-white text-purple-700 shadow"
            >
              My Teams
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

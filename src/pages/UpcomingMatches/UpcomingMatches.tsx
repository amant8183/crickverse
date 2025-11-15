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
    <div>
      <h1>Upcoming Matches</h1>

      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          onClick={() => navigate(`/pick-players/${match.id}`)}
        />
      ))}



    </div>
  );
}

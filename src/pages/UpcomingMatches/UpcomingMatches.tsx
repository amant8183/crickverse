import { useEffect, useState } from "react";
import { getUpcomingMatches } from "../../api/matches";
import type { Match } from "../../types/match";

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

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

      {matches.map((match, index) => (
        <div key={match.id ?? index}>
          {match.t1_short_name} vs {match.t2_short_name}
        </div>
      ))}


    </div>
  );
}

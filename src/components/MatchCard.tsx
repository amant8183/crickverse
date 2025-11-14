import type { Match } from "../types/match.tsx";
import { useNavigate } from "react-router-dom";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/match/${match.match_id}/pick-players`);
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 bg-white shadow rounded-xl border cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">
          {match.team_1} vs {match.team_2}
        </div>
        <div className="text-sm text-gray-500">
          {match.match_date} • {match.match_time}
        </div>
      </div>
    </div>
  );
}

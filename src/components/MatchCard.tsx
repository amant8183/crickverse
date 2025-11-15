import type { Match } from "../types/match";

interface Props {
  match: Match;
  onClick?: () => void;
}

export default function MatchCard({ match, onClick }: Props) {
  return (
    <div
      className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg cursor-pointer mb-4"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <span className="text-sm opacity-80">{match.match_name}</span>
        <span className="text-xl font-semibold">
          {match.t1_short_name} vs {match.t2_short_name}
        </span>
        <span className="text-sm opacity-80">{match.match_date}</span>
      </div>

      <div className="flex items-center gap-4">
        <img src={match.t1_image} alt={match.t1_short_name} className="w-12 h-12" />
        <img src={match.t2_image} alt={match.t2_short_name} className="w-12 h-12" />
      </div>
    </div>
  );
}

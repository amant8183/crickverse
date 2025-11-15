import type { Player } from "../types/player";

export default function PlayerCard({
  player,
  selected,
  onToggle,
}: {
  player: Player;
  selected: boolean;
  onToggle: (p: Player) => void;
}) {
  return (
    <div
      onClick={() => onToggle(player)}
      className={`p-3 border rounded-xl shadow cursor-pointer ${
        selected ? "bg-green-200 border-green-700" : "bg-white"
      }`}
    >
      <img src={player.team_logo} className="w-10 h-10 mb-2" />
      <div className="font-bold">{player.name}</div>
      <div className="text-sm opacity-70">{player.role}</div>
      <div className="mt-1 text-sm opacity-70">
        {player.team_short_name}
      </div>
      <div className="font-medium mt-1">
        Credits: {player.event_player_credit}
      </div>
    </div>
  );
}

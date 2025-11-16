import type { Player } from "../types/player";

interface Props {
  player: Player;
  captainId: number | null;
  viceCaptainId: number | null;
  onSetCaptain: (id: number) => void;
  onSetViceCaptain: (id: number) => void;
}

export default function CaptainCard({
  player,
  captainId,
  viceCaptainId,
  onSetCaptain,
  onSetViceCaptain,
}: Props) {
  const isCaptain = captainId === player.id;
  const isViceCaptain = viceCaptainId === player.id;

  return (
    <div
      className={`p-3 border rounded-xl shadow-md bg-white relative ${
        isCaptain || isViceCaptain
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200"
      }`}
    >
      <img src={player.team_logo} className="w-10 h-10 mb-2" />

      <div className="font-semibold">{player.name}</div>
      <div className="text-sm opacity-70">{player.role}</div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onSetCaptain(player.id)}
          className={`px-2 py-1 rounded ${
            isCaptain ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          C
        </button>

        <button
          onClick={() => onSetViceCaptain(player.id)}
          className={`px-2 py-1 rounded ${
            isViceCaptain ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          VC
        </button>
      </div>
    </div>
  );
}

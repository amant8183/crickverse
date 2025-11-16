import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Player } from "../../types/player";
import { getPlayers } from "../../api/players";
import { canSelectPlayer, getTeamValidationErrors, isFinalTeamValid } from "../../utils/teamValidation";

import PlayerCard from "../../components/PlayerCard";
import RoleFilter from "../../components/RoleFilter";
import SelectionSummary from "../../components/SelectionSummary";

export default function PickPlayers() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [selected, setSelected] = useState<Player[]>([]);
  const [roleFilter, setRoleFilter] = useState("ALL");

  const errors = getTeamValidationErrors(selected);

  useEffect(() => {
    getPlayers().then(setPlayers);
  }, [matchId]);

  const toggle = (p: Player) => {
    const exists = selected.some((x) => x.id === p.id);

    if (exists) {
      setSelected(selected.filter((x) => x.id !== p.id));
      return;
    }

    if (canSelectPlayer(p, selected)) {
      setSelected([...selected, p]);
    }
  };

  const visible =
    roleFilter === "ALL"
      ? players
      : players.filter((p) => p.role === roleFilter);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Pick Players</h1>

      <SelectionSummary selected={selected} />

      <RoleFilter active={roleFilter} setFilter={setRoleFilter} />

      <div className="grid grid-cols-2 gap-3">
        {visible.map((p) => (
          <PlayerCard
            key={p.id}
            player={p}
            selected={selected.some((x) => x.id === p.id)}
            onToggle={toggle}
          />
        ))}
      </div>

      {/* 🔥 Always visible button — only disabled when invalid */}
      <button
        disabled={errors.length > 0}
        onClick={() =>
          navigate(`/captain/${matchId}`, {
            state: { players: selected },
          })
        }
        className={`mt-6 w-full py-3 rounded-xl text-lg ${errors.length === 0
            ? "bg-blue-600 text-white"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
      >
        Proceed to Pick Captain
      </button>

      {/* 🔥 Show validation messages */}
      {errors.length > 0 && (
        <ul className="mt-3 text-red-600 text-sm list-disc pl-5">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}

    </div>
  );

}

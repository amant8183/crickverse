import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Player } from "../../types/player";
import type { SavedTeam } from "../../types/myTeams";

import CurrentTeam from "./CurrentTeam";
import SavedTeamList from "./SavedTeamList";

export default function MyTeams() {
  const { state } = useLocation();
  const { matchId } = useParams();

  const [currentPlayers, setCurrentPlayers] = useState<Player[]>(state?.players ?? []);
  const [captainId, setCaptainId] = useState<number | null>(state?.captainId ?? null);
  const [viceCaptainId, setViceCaptainId] = useState<number | null>(state?.viceCaptainId ?? null);

  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);

  // Load saved teams on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fantasyTeams") || "{}");
    setSavedTeams(data[matchId || ""] || []);
  }, [matchId]);

  const handleSaveTeam = () => {
    if (!matchId) return;

    const newTeam: SavedTeam = {
      players: currentPlayers,
      captainId,
      viceCaptainId,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("fantasyTeams") || "{}");

    const updated = {
      ...existing,
      [matchId]: [...(existing[matchId] || []), newTeam],
    };

    localStorage.setItem("fantasyTeams", JSON.stringify(updated));

    setSavedTeams(updated[matchId]);
    alert("Team saved successfully!");

    // CLEAR current team after saving
    setCurrentPlayers([]);
    setCaptainId(null);
    setViceCaptainId(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Teams</h1>

      <CurrentTeam
        players={currentPlayers}
        captainId={captainId}
        viceCaptainId={viceCaptainId}
        onSave={handleSaveTeam}
      />

      <SavedTeamList teams={savedTeams} />
    </div>
  );
}

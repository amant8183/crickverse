import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Player } from "../../types/player";
import type { SavedTeam } from "../../types/myTeams";

import CurrentTeam from "./CurrentTeam";
import SavedTeamList from "./SavedTeamList";

export default function MyTeams() {
  const { state } = useLocation();
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [currentPlayers, setCurrentPlayers] = useState<Player[]>(state?.players ?? []);
  const [captainId, setCaptainId] = useState<number | null>(state?.captainId ?? null);
  const [viceCaptainId, setViceCaptainId] = useState<number | null>(state?.viceCaptainId ?? null);

  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load saved teams on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("fantasyTeams");
      const data = raw ? JSON.parse(raw) : {};
      setSavedTeams(data[matchId || ""] || []);
      setError(null);
    } catch (err) {
      console.error("Error reading saved teams:", err);
      setError("We had trouble loading your teams. You can still create a new team.");
      setSavedTeams([]);
    }
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
    const existingTeams: SavedTeam[] = existing[matchId] || [];

    const updatedTeams: SavedTeam[] = [...existingTeams, newTeam];

    const updated = {
      ...existing,
      [matchId]: updatedTeams,
    };

    localStorage.setItem("fantasyTeams", JSON.stringify(updated));

    setSavedTeams(updatedTeams);
    alert("Team saved successfully!");

    // CLEAR current team after saving
    setCurrentPlayers([]);
    setCaptainId(null);
    setViceCaptainId(null);

    // Clear route state so refresh doesn't restore this team as current
    navigate(`/teams/${matchId}`, { replace: true, state: {} });
  };

  const handleEditTeam = (index: number) => {
    if (!matchId) return;

    const team = savedTeams[index];

    // Remove this team from saved list while it is being edited
    const existing = JSON.parse(localStorage.getItem("fantasyTeams") || "{}");
    const existingTeams: SavedTeam[] = existing[matchId] || [];
    const updatedTeams = existingTeams.filter((_, i) => i !== index);
    const updated = {
      ...existing,
      [matchId]: updatedTeams,
    };
    localStorage.setItem("fantasyTeams", JSON.stringify(updated));
    setSavedTeams(updatedTeams);

    navigate(`/pick-players/${matchId}`, {
      state: {
        players: team.players,
        captainId: team.captainId,
        viceCaptainId: team.viceCaptainId,
      },
    });
  };

  const handleDeleteTeam = (index: number) => {
    if (!matchId) return;

    const existing = JSON.parse(localStorage.getItem("fantasyTeams") || "{}");
    const existingTeams: SavedTeam[] = existing[matchId] || [];

    const updatedTeams = existingTeams.filter((_, i) => i !== index);
    const updated = {
      ...existing,
      [matchId]: updatedTeams,
    };

    localStorage.setItem("fantasyTeams", JSON.stringify(updated));
    setSavedTeams(updatedTeams);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Teams</h1>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <CurrentTeam
        players={currentPlayers}
        captainId={captainId}
        viceCaptainId={viceCaptainId}
        onSave={handleSaveTeam}
      />

      <SavedTeamList
        teams={savedTeams}
        onEdit={handleEditTeam}
        onDelete={handleDeleteTeam}
      />
    </div>
  );
}

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

  // Load saved teams
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

    navigate(`/teams/${matchId}`, { replace: true, state: {} });
  };

  const handleEditTeam = (index: number) => {
    if (!matchId) return;

    const team = savedTeams[index];

    // Remove team from list while editing
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
    <div className="pt-14 h-screen min-h-0 flex flex-col bg-[var(--color-bgPrimary)]">
      {/* Header */}
      <div className="flex-shrink-0 bg-[var(--color-primary)] px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-white">My Teams</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex-shrink-0 bg-white border-t border-[var(--color-textSubtle)]/10 px-4 py-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-2">
            <p className="text-red-600 text-[10px]">{error}</p>
          </div>
        </div>
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 min-h-0 flex flex-col bg-white">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-white px-4 py-3 space-y-3">

          {/* Current Team Card */}
          <CurrentTeam
            players={currentPlayers}
            captainId={captainId}
            viceCaptainId={viceCaptainId}
            onSave={handleSaveTeam}
          />

          {/* Saved Team List */}
          <SavedTeamList
            teams={savedTeams}
            onEdit={handleEditTeam}
            onDelete={handleDeleteTeam}
          />

        </div>
      </div>
    </div>
  );
}

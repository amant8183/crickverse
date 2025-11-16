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
  const [editingIndex, setEditingIndex] = useState<number | null>(state?.editingIndex ?? null);

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
    const existingTeams: SavedTeam[] = existing[matchId] || [];

    let updatedTeams: SavedTeam[];
    if (
      editingIndex !== null &&
      editingIndex >= 0 &&
      editingIndex < existingTeams.length
    ) {
      // Update an existing team
      updatedTeams = [...existingTeams];
      updatedTeams[editingIndex] = newTeam;
    } else {
      // Create a new team
      updatedTeams = [...existingTeams, newTeam];
    }

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
    setEditingIndex(null);
  };

  const handleEditTeam = (index: number) => {
    if (!matchId) return;

    const team = savedTeams[index];
    navigate(`/pick-players/${matchId}`, {
      state: {
        players: team.players,
        captainId: team.captainId,
        viceCaptainId: team.viceCaptainId,
        editingIndex: index,
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

    // If we were editing this team, clear the current editor state
    if (editingIndex !== null) {
      if (editingIndex === index) {
        setCurrentPlayers([]);
        setCaptainId(null);
        setViceCaptainId(null);
        setEditingIndex(null);
      } else if (editingIndex > index) {
        // Shift editing index down if a previous team was removed
        setEditingIndex(editingIndex - 1);
      }
    }
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

      <SavedTeamList
        teams={savedTeams}
        onEdit={handleEditTeam}
        onDelete={handleDeleteTeam}
      />
    </div>
  );
}

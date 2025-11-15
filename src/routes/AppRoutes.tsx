import { Routes, Route } from "react-router-dom";

import UpcomingMatches from "../pages/UpcomingMatches/UpcomingMatches";
import PickPlayers from "../pages/PickPlayers/PickPlayers";
import PickCaptain from "../pages/PickCaptain/PickCaptain";
import MyTeams from "../pages/MyTeams/MyTeams";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UpcomingMatches />} />

      {/* Pick Players */}
      <Route path="/pick-players/:matchId" element={<PickPlayers />} />

      {/* Captain & Vice Captain */}
      <Route path="/captain/:matchId" element={<PickCaptain />} />

      {/* My Teams */}
      <Route path="/teams/:matchId" element={<MyTeams />} />
    </Routes>
  );
}

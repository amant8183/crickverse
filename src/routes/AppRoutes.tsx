import { Routes, Route } from "react-router-dom";

import UpcomingMatches from "../pages/UpcomingMatches/UpcomingMatches.tsx";
import PickPlayers from "../pages/PickPlayers/PickPlayers.tsx";
import PickCaptain from "../pages/PickCaptain/PickCaptain.tsx";
import MyTeams from "../pages/MyTeams/MyTeams.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UpcomingMatches />} />
      <Route path="/match/:matchId/pick-players" element={<PickPlayers />} />
      <Route path="/match/:matchId/captain" element={<PickCaptain />} />
      <Route path="/match/:matchId/teams" element={<MyTeams />} />
    </Routes>
  );
}

import axios from "axios";
import type { Match } from "../types/match";

export const getUpcomingMatches = async (): Promise<Match[]> => {
  const url = import.meta.env.VITE_API_MATCHES_URL;
  const res = await axios.get(url);

  const matchesObject = res.data.matches.cricket;
  const matchesArray = matchesObject;

  return matchesArray as Match[];
};

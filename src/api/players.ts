import axios from "axios";
import type { Player } from "../types/player";

export const getPlayers = async (): Promise<Player[]> => {
  const url = import.meta.env.VITE_API_PLAYERS_URL;
  const res = await axios.get(url);

  return res.data;
};

import axios from "axios";

export const getPlayers = async () => {
  const url = import.meta.env.VITE_API_PLAYERS_URL;
  const res = await axios.get(url);
  return res.data;
};

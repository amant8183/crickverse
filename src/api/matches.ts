import axios from "axios";

export const getUpcomingMatches = async () => {
  const url = import.meta.env.VITE_API_MATCHES_URL;
  const res = await axios.get(url);
  return res.data;
};

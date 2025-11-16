export const isCaptainSelectionValid = (
  captainId: number | null,
  viceCaptainId: number | null
) => {
  return !!captainId && !!viceCaptainId && captainId !== viceCaptainId;
};

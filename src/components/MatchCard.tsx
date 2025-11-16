import type { Match } from "../types/match";

interface Props {
  match: Match;
  onClick?: () => void;
  joined?: boolean;
}

export default function MatchCard({ match, onClick, joined = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
className="w-full flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[var(--color-bgWhite)] to-[var(--color-primaryLight)]/10 text-[var(--color-textDim)] px-4 py-4 shadow-sm border border-[var(--color-textSubtle)]/20 hover:border-[var(--color-primaryLight)]/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primaryLight)]/40 transition-all"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <img
            src={match.t1_image}
            alt={match.t1_short_name}
            className="w-10 h-10 object-contain"
          />
          <img
            src={match.t2_image}
            alt={match.t2_short_name}
            className="w-10 h-10 object-contain"
          />
        </div>

        <div className="flex flex-col items-start min-w-0">
          <span className="text-[11px] uppercase tracking-wide text-[var(--color-textSubtle)]/80 truncate">
            {match.match_name}
          </span>
          <span className="text-sm font-semibold text-[var(--color-textDark)] truncate">
            {match.t1_short_name} vs {match.t2_short_name}
          </span>
          <span className="text-[11px] text-[var(--color-textSubtle)] mt-0.5 truncate">
            {match.match_date}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-end gap-1">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-primaryLight)]/12 text-[var(--color-primaryLight)]">
            Cricket
          </span>
          {joined ? (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-accentBlue)]/10 text-[var(--color-accentBlue)] border border-[var(--color-accentBlue)]/30">Joined</span>
          ) : (
            <span className="text-[10px] text-[var(--color-textSubtle)]">Tap to create team</span>
          )}
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-textSubtle)]"><path d="M9 18l6-6-6-6v12Z"/></svg>
      </div>
    </button>
  );
}

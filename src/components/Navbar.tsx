import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const onHome = location.pathname === "/";

  return (
    <header className="bg-[var(--color-bgDark)] text-[var(--color-textPrimary)] shadow-md">
      <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-xs font-bold text-[var(--color-textLight)]">
            CV
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold leading-none">CrickVerse</span>
            <span className="text-[10px] text-[var(--color-textSecondary)] leading-none mt-1">
              Fantasy Sports
            </span>
          </div>
        </button>

        {/* Primary nav action */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
            onHome
              ? "bg-[var(--color-primary)] border-transparent text-[var(--color-textLight)]"
              : "bg-transparent border-[var(--color-primaryLight)] text-[var(--color-textLighter)] hover:bg-[var(--color-primaryLight)] hover:text-[var(--color-textLight)]"
          }`}
        >
          Upcoming Matches
        </button>
      </div>
    </header>
  );
}

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  const goToLastMatchRoute = (path: "pick" | "teams") => {
    const lastMatchId = localStorage.getItem("lastMatchId");
    if (!lastMatchId) {
      // If no match has been chosen yet, send user to matches list
      navigate("/");
      alert("Select a match from Upcoming Matches first.");
      return;
    }

    if (path === "pick") {
      navigate(`/pick-players/${lastMatchId}`);
    } else {
      navigate(`/teams/${lastMatchId}`);
    }
  };

  return (
    <header className="bg-[var(--color-bgDark)] text-[var(--color-textPrimary)] shadow-md fixed w-full z-100 ">
      {/* Top row: brand */}
      <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goHome}
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
      </div>
      
      
    </header>
  );
}

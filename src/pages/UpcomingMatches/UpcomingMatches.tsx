import { useEffect, useState } from "react";
import { getUpcomingMatches } from "../../api/matches.ts";
import type { Match } from "../../types/match.ts";
import MatchCard from "../../components/MatchCard.tsx";
import { useNavigate } from "react-router-dom";

function SkeletonCard() {
  return (
    <div className="h-24 rounded-2xl border border-[var(--color-textSubtle)]/20 bg-[var(--color-bgSecondary)]/40 animate-pulse p-3 flex items-center justify-between">
      <div className="flex items-center gap-3 w-2/3">
        <div className="w-10 h-10 rounded bg-[var(--color-textSubtle)]/20" />
        <div className="w-10 h-10 rounded bg-[var(--color-textSubtle)]/20" />
        <div className="space-y-2 w-1/2">
          <div className="h-3 w-24 rounded bg-[var(--color-textSubtle)]/20" />
          <div className="h-3 w-36 rounded bg-[var(--color-textSubtle)]/20" />
          <div className="h-3 w-20 rounded bg-[var(--color-textSubtle)]/20" />
        </div>
      </div>
      <div className="space-y-2 w-1/4">
        <div className="h-5 w-20 rounded-full bg-[var(--color-textSubtle)]/20 ml-auto" />
        <div className="h-3 w-24 rounded bg-[var(--color-textSubtle)]/20 ml-auto" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-[var(--color-textSubtle)]/20 bg-[var(--color-bgSecondary)]/30 p-8 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primaryLight)]/15 text-[var(--color-primaryLight)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 2h10a2 2 0 0 1 2 2v3H5V4a2 2 0 0 1 2-2Zm12 7H5v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9ZM8 12h3v3H8v-3Z" />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-[var(--color-textLight)]">No upcoming matches</h3>
      <p className="mt-1 text-xs text-[var(--color-textSecondary)]">Please check back later for new fixtures.</p>
    </div>
  );
}

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | "joined">("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const offers = [
    {
      title: "Welcome Bonus",
      description: "Get 100% bonus on your first deposit up to $500",
      badge: "NEW USER",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "Weekend Special",
      description: "Join 3 contests and get 1 free entry this weekend",
      badge: "LIMITED TIME",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Refer & Earn",
      description: "Invite friends and earn $50 for each successful referral",
      badge: "POPULAR",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  const joinedSet = (() => {
    try {
      const raw = localStorage.getItem("joined_matches");
      const arr = raw ? (JSON.parse(raw) as number[]) : [];
      return new Set(arr);
    } catch {
      return new Set<number>();
    }
  })();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getUpcomingMatches();
        setMatches(data);
        setError(null);
      } catch (err) {
        console.error("Error loading matches:", err);
        setError("Could not load upcoming matches. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className=" max-w-6xl px-4 pt-16 space-y-5 bg-bgWhite h-screen">
      {/* Offers Carousel */}
      <section className="relative overflow-hidden  rounded-xs border bg-bgDark  border-white/5 shadow-sm">
        <div className="relative h-40">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                } ${index < currentSlide ? '-translate-x-full' : ''}`}
            >
              <div className={`h-full bg-gradient-to-r ${offer.gradient} px-6 py-8 flex flex-col justify-between`}>
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-white/20 rounded-full mb-3">
                    {offer.badge}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2">{offer.title}</h2>
                  <p className="text-sm text-white/90">{offer.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Go to My Teams Button */}
      <div className="flex">
        <button
          onClick={() => navigate("/teams/" + (localStorage.getItem("lastMatchId") || ""))}
          className="ml-auto px-4 py-2 rounded-lg bg-[var(--color-accentRed)] text-white text-sm font-semibold shadow-sm hover:opacity-90 transition"
        >
          My Teams
        </button>
      </div>


      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 rounded-2xl border border-[var(--color-accentRedHover)]/30 bg-[var(--color-accentRedHover)]/10 p-3 text-[var(--color-textLight)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 text-[var(--color-accentRedHover)]"><path d="M11 7h2v6h-2V7Zm0 8h2v2h-2v-2Zm1-13a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" /></svg>
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1">
        {loading && Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)}

        {!loading && !error && matches.length === 0 && (
          <div className="col-span-full">
            <EmptyState />
          </div>
        )}

        {!loading && !error &&
          (tab === "all" ? matches : matches.filter((m) => joinedSet.has(m.id))).map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              joined={joinedSet.has(match.id)}
              onClick={() => {
                localStorage.setItem("lastMatchId", String(match.id));
                navigate(`/pick-players/${match.id}`);
              }}
            />
          ))}
      </div>
    </div>
  );
}

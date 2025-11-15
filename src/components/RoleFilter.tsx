interface RoleFilterProps {
  active: string;
  setFilter: (role: string) => void;
}

export default function RoleFilter({ active, setFilter }: RoleFilterProps) {
  const roles = ["ALL", "Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"];

  return (
    <div className="flex gap-3 mb-4">
      {roles.map((r) => (
        <button
          key={r}
          onClick={() => setFilter(r)}
          className={`px-4 py-2 rounded-lg ${
            active === r ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

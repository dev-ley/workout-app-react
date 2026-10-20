import "./MainNav.css";

type Tab = "treinos" | "exercicios" | "dieta" | "progresso";

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "treinos", label: "Treinos", icon: "🏋️" },
  { id: "exercicios", label: "Exercícios", icon: "💪" },
  { id: "dieta", label: "Dieta", icon: "🍎" },
  { id: "progresso", label: "Progresso", icon: "📈" },
];

export function MainNav({ active, onChange }: Props) {
  return (
    <nav className="main-nav glass" aria-label="Navegação principal">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`nav-btn ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
          aria-current={active === tab.id ? "page" : undefined}
        >
          <span className="nav-icon" aria-hidden="true">
            {tab.icon}
          </span>

          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
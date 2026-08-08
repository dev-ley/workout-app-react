import "./MainNav.css";

type Props = {
  active: string;
  onChange: (tab: any) => void;
};

export function MainNav({ active, onChange }: Props) {
  const tabs = [
    { id: "treinos", label: "Treinos", icon: "🏋️" },
    { id: "exercicios", label: "Exercícios", icon: "💪" },
    { id: "dieta", label: "Dieta", icon: "🍎" },
    { id: "progresso", label: "Progresso", icon: "📈" },
  ];

  return (
    <nav className="main-nav glass">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-btn ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

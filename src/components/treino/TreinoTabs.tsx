import "./TreinoTabs.css";

type TreinoTabsProps = {
  active: "A" | "B" | "C";
  onChange: (treino: "A" | "B" | "C") => void;
};

export function TreinoTabs({ active, onChange }: TreinoTabsProps) {
  return (
    <div className="treino-tabs glass">
      {["A", "B", "C"].map((t) => (
        <button
          key={t}
          className={`treino-tab ${active === t ? "active" : ""}`}
          onClick={() => onChange(t as "A" | "B" | "C")}
        >
          Treino {t}
        </button>
      ))}
    </div>
  );
}

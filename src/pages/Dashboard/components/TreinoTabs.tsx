interface Props {
  active: "A" | "B" | "C";
  onChange: (treino: "A" | "B" | "C") => void;
}

export function TreinoTabs({ active, onChange }: Props) {
  return (
    <div className="treino-tabs">
      <button
        className={`tab-btn ${active === "A" ? "active" : ""}`}
        onClick={() => onChange("A")}
      >
        Treino A
      </button>

      <button
        className={`tab-btn ${active === "B" ? "active" : ""}`}
        onClick={() => onChange("B")}
      >
        Treino B
      </button>

      <button
        className={`tab-btn ${active === "C" ? "active" : ""}`}
        onClick={() => onChange("C")}
      >
        Treino C
      </button>
    </div>
  );
}

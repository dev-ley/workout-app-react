
import "./ChooseTreinoModal.css";
import { useEffect } from "react";

type Treino = "A" | "B" | "C";

type ChooseTreinoModalProps = {
  exercise: {
    name: string;
    gif?: string;
    category?: string;
  };
  onClose: () => void;
  onAdded: (treino: Treino) => void;
};

const treinos: { id: Treino; description: string }[] = [
  { id: "A", description: "Adicionar à rotina A" },
  { id: "B", description: "Adicionar à rotina B" },
  { id: "C", description: "Adicionar à rotina C" },
];

export function ChooseTreinoModal({
  exercise,
  onClose,
  onAdded,
}: ChooseTreinoModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="choose-treino-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="choose-treino-panel glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="choose-treino-title"
      >
        <header className="choose-treino-header">
          <div className="choose-treino-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6 7h12M6 12h12M6 17h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M3 5v14M21 5v14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <button
            type="button"
            className="choose-treino-close"
            onClick={onClose}
            aria-label="Fechar seleção de treino"
          >
            ×
          </button>
        </header>

        <span className="choose-treino-eyebrow">ORGANIZE A SUA ROTINA</span>

        <h2 id="choose-treino-title">Adicionar ao treino</h2>

        <p className="choose-treino-description">
          Escolha em qual treino pretende incluir este exercício.
        </p>

        <div className="choose-treino-exercise">
          <span className="choose-treino-exercise-label">EXERCÍCIO</span>
          <strong>{exercise.name}</strong>
          {exercise.category && (
            <span className="choose-treino-exercise-category">
              {exercise.category}
            </span>
          )}
        </div>

        <div className="choose-buttons">
          {treinos.map((treino) => (
            <button
              type="button"
              key={treino.id}
              className="choose-btn"
              onClick={() => {
                onAdded(treino.id);
                onClose();
              }}
            >
              <span className="choose-btn-letter">{treino.id}</span>
              <span className="choose-btn-text">
                <strong>Treino {treino.id}</strong>
                <small>{treino.description}</small>
              </span>
              <span className="choose-btn-arrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="choose-treino-cancel"
          onClick={onClose}
        >
          Cancelar
        </button>
      </section>
    </div>
  );
}

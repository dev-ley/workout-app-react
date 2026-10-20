
import "./ExerciseModal.css";
import { useEffect, useMemo, useState } from "react";
import { useExercises } from "../../hooks/useExercises";
import { ExerciseCard } from "./ExerciseCard";

type Exercise = {
  name: string;
  category: string;
  gif: string;
};

type ExerciseModalProps = {
  onClose: () => void;
  onSelectExercise: (exercise: Exercise) => void;
  onOpenGif: (gifUrl: string) => void;
};

export function ExerciseModal({
  onClose,
  onSelectExercise,
  onOpenGif,
}: ExerciseModalProps) {
  const { exercises, categories, category, setCategory, loading } =
    useExercises();

  const [search, setSearch] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const filteredExercises = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();

    if (!term) return exercises;

    return exercises.filter((exercise) =>
      exercise.name.toLocaleLowerCase().includes(term)
    );
  }, [exercises, search]);

  return (
    <div
      className="exercise-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="exercise-modal-panel glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exercise-modal-title"
      >
        <header className="exercise-modal-header">
          <div>
            <span className="exercise-modal-eyebrow">
              BIBLIOTECA DE TREINOS
            </span>
            <h2 id="exercise-modal-title">Lista de exercícios</h2>
            <p>Encontre um exercício para adicionar ao seu treino.</p>
          </div>

          <button
            type="button"
            className="exercise-modal-close"
            onClick={onClose}
            aria-label="Fechar lista de exercícios"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="exercise-modal-search">
          <label htmlFor="exercise-modal-search-input">
            Pesquisar exercício
          </label>

          <div className="exercise-modal-search-field">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle
                cx="10.8"
                cy="10.8"
                r="6.8"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="m16 16 4.2 4.2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

            <input
              id="exercise-modal-search-input"
              type="search"
              placeholder="Ex.: supino, agachamento..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Limpar pesquisa"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="exercise-modal-category-section">
          <span className="exercise-modal-section-label">Categorias</span>

          <div className="exercise-modal-categories">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={`exercise-modal-category ${
                  category === item ? "active" : ""
                }`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="exercise-modal-results-heading">
          <h3>Exercícios disponíveis</h3>
          {!loading && (
            <span>
              {filteredExercises.length}{" "}
              {filteredExercises.length === 1 ? "resultado" : "resultados"}
            </span>
          )}
        </div>

        <div className="exercise-modal-list">
          {loading ? (
            <div className="exercise-modal-state" role="status">
              <span className="exercise-modal-loader" />
              <p>A carregar exercícios...</p>
            </div>
          ) : filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.name}
                exercise={exercise}
                onSelect={() => onSelectExercise(exercise)}
                onOpenGif={() => {
                  if (exercise.gif) onOpenGif(exercise.gif);
                }}
              />
            ))
          ) : (
            <div className="exercise-modal-state">
              <h3>Nenhum exercício encontrado</h3>
              <p>Experimenta outro nome ou seleciona outra categoria.</p>
              <button
                type="button"
                className="exercise-modal-reset"
                onClick={() => setSearch("")}
              >
                Limpar pesquisa
              </button>
            </div>
          )}
        </div>

        <footer className="exercise-modal-footer">
          <button
            type="button"
            className="exercise-modal-cancel"
            onClick={onClose}
          >
            Fechar biblioteca
          </button>
        </footer>
      </section>
    </div>
  );
}

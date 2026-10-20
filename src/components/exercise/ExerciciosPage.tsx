
import "./ExerciciosPage.css";
import { useMemo, useState } from "react";
import { useExercises } from "../../hooks/useExercises";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  onSelectExercise: (exercise: any) => void;
  onOpenGif: (gifUrl: string) => void;
};

export function ExerciciosPage({ onSelectExercise, onOpenGif }: Props) {
  const {
    exercises,
    categories,
    category,
    setCategory,
    loading,
  } = useExercises();

  const [search, setSearch] = useState("");

  const filteredExercises = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();

    if (!term) return exercises;

    return exercises.filter((exercise) =>
      exercise.name.toLocaleLowerCase().includes(term)
    );
  }, [exercises, search]);

  return (
    <section className="ex-page" aria-label="Biblioteca de exercícios">
      <header className="ex-page-header">
        <div className="ex-page-heading">
          <span className="ex-eyebrow">A SUA BIBLIOTECA</span>
          <h1>Exercícios</h1>
          <p>
            Explore os exercícios, veja os movimentos e monte o seu treino.
          </p>
        </div>

        {!loading && (
          <div className="ex-total">
            <span className="ex-total-number">
              {filteredExercises.length}
            </span>
            <span className="ex-total-label">
              {filteredExercises.length === 1 ? "exercício" : "exercícios"}
            </span>
          </div>
        )}
      </header>

      <div className="ex-filters glass">
        <div className="ex-search-container">
          <label className="ex-control-label" htmlFor="ex-search">
            Pesquisar
          </label>

          <div className="ex-search-field">
            <span className="ex-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
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
            </span>

            <input
              id="ex-search"
              className="ex-search-input"
              type="search"
              placeholder="Ex.: supino, agachamento..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="ex-clear-search"
                onClick={() => setSearch("")}
                aria-label="Limpar pesquisa"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="ex-category-container">
          <label className="ex-control-label" htmlFor="ex-category">
            Categoria
          </label>

          <select
            id="ex-category"
            className="ex-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ex-results-heading">
        <div>
          <h2>Biblioteca</h2>
          <p>Escolha um exercício para adicionar ao seu treino.</p>
        </div>

        {search && (
          <button
            type="button"
            className="ex-reset-button"
            onClick={() => setSearch("")}
          >
            Limpar pesquisa
          </button>
        )}
      </div>

      {loading ? (
        <div className="ex-state glass" role="status">
          <span className="ex-loader" aria-hidden="true" />
          <h3>A carregar exercícios</h3>
          <p>Estamos a preparar a sua biblioteca.</p>
        </div>
      ) : filteredExercises.length > 0 ? (
        <div className="ex-list">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              onSelect={() => onSelectExercise(exercise)}
              onOpenGif={() => onOpenGif(exercise.gif)}
            />
          ))}
        </div>
      ) : (
        <div className="ex-state glass">
          <span className="ex-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle
                cx="10.8"
                cy="10.8"
                r="6.8"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="m16 16 4.2 4.2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <h3>Nenhum exercício encontrado</h3>
          <p>
            Experimente outro nome ou limpe a pesquisa para ver todos os
            exercícios desta categoria.
          </p>
          <button
            type="button"
            className="ex-empty-button"
            onClick={() => setSearch("")}
          >
            Limpar pesquisa
          </button>
        </div>
      )}
    </section>
  );
}

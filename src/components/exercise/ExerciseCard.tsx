
import "./ExerciseCard.css";

type Exercise = {
  name: string;
  category: string;
  gif: string;
};

type ExerciseCardProps = {
  exercise: Exercise;
  onSelect: () => void;
  onOpenGif: () => void;
};

export function ExerciseCard({
  exercise,
  onSelect,
  onOpenGif,
}: ExerciseCardProps) {
  return (
    <article className="exercise-card glass">
      <button
        type="button"
        className="exercise-media"
        onClick={onOpenGif}
        aria-label={`Ver demonstração de ${exercise.name}`}
      >
        {exercise.gif ? (
          <img
            src={exercise.gif}
            className="exercise-gif"
            alt={`Demonstração de ${exercise.name}`}
            loading="lazy"
          />
        ) : (
          <span className="exercise-no-gif">Sem imagem</span>
        )}

        {exercise.gif && (
          <span className="exercise-media-hint" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M8 5.5 19 12 8 18.5v-13Z"
                fill="currentColor"
              />
            </svg>
          </span>
        )}
      </button>

      <div className="exercise-info">
        <span className="exercise-category">{exercise.category}</span>

        <h3 className="exercise-name">{exercise.name}</h3>

        <button
          type="button"
          className="add-btn"
          onClick={onSelect}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Adicionar ao treino</span>
        </button>
      </div>
    </article>
  );
}

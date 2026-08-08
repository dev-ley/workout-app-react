import "./ExerciseModal.css";
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

  return (
    <div className="modal-backdrop">
      <div className="modal glass">

        <div className="modal-header">
          <h2>Lista de Exercícios</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="category-tabs">
          {categories.map((c) => (
            <button
              key={c}
              className={`category-tab ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="exercise-list">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            exercises.map((ex) => (
              <ExerciseCard
                key={ex.name}
                exercise={ex}
                onSelect={() => onSelectExercise(ex)}
                onOpenGif={() => onOpenGif(ex.gif)}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

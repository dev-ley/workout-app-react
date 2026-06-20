import { useExercises } from "../../../hooks/useExercises";
import type { Exercise } from "../../../hooks/useExercises";
interface Props {
  onClose: () => void;
  onSelectExercise: (exercise: Exercise) => void;
  onOpenGif: (url: string) => void;
}

export function ExerciseModal({
  onClose,
  onSelectExercise,
  onOpenGif,
}: Props) {
  const {
    exercises,
    categories,
    category,
    setCategory,
    loading,
  } = useExercises();

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>Escolha um exercício</h2>

        {/* FILTRO */}
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Todas as categorias" : cat}
            </option>
          ))}
        </select>

        {/* LISTA */}
        <div className="exercise-list">
          {loading && <p>Carregando...</p>}

          {!loading &&
            exercises.map((ex) => (
              <div key={ex.name} className="exercise-card">
                <img
                  src={ex.gif}
                  className="exercise-gif"
                  onClick={() => onOpenGif(ex.gif)}
                />

                <div>
                  <h3>{ex.name}</h3>
                  <p>{ex.category}</p>
                </div>

                <button
                  className="add-btn"
                  onClick={() => onSelectExercise(ex)}
                >
                  Add+
                </button>
              </div>
            ))}
        </div>

        {/* FECHAR */}
        <button className="close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

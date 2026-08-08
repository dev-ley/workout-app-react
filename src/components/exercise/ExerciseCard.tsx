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
    <div className="exercise-card glass">
      <img
        src={exercise.gif}
        className="exercise-gif"
        onClick={onOpenGif}
      />

      <div className="exercise-info">
        <h3>{exercise.name}</h3>
        <p>{exercise.category}</p>

        <button className="add-btn" onClick={onSelect}>
          Adicionar ao treino
        </button>
      </div>
    </div>
  );
}

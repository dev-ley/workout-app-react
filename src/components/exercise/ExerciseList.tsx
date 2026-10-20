
import "./ExerciseList.css";
import { ExerciseCard } from "./ExerciseCard";

type Exercise = {
  name: string;
  category: string;
  gif: string;
};

type ExerciseListProps = {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
  onOpenGif: (gifUrl: string) => void;
};

export function ExerciseList({
  exercises,
  onSelectExercise,
  onOpenGif,
}: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="exercise-list-empty">
        <h3>Nenhum exercício disponível</h3>
        <p>Experimenta selecionar outra categoria.</p>
      </div>
    );
  }

  return (
    <div className="exercise-list">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.name}
          exercise={exercise}
          onSelect={() => onSelectExercise(exercise)}
          onOpenGif={() => {
            if (exercise.gif) onOpenGif(exercise.gif);
          }}
        />
      ))}
    </div>
  );
}

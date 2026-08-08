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
  return (
    <div className="exercise-list">
      {exercises.map((ex) => (
        <ExerciseCard
          key={ex.name}
          exercise={ex}
          onSelect={() => onSelectExercise(ex)}
          onOpenGif={() => onOpenGif(ex.gif)}
        />
      ))}
    </div>
  );
}

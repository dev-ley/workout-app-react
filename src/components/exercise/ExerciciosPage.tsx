import "./ExerciciosPage.css";
import { useExercises } from "../../hooks/useExercises";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  onSelectExercise: (exercise: any) => void;
  onOpenGif: (gifUrl: string) => void;
};

export function ExerciciosPage({ onSelectExercise, onOpenGif }: Props) {
  const { exercises, categories, category, setCategory, loading } = useExercises();

  return (
    <div className="ex-page">
      {/* SELECT DE CATEGORIAS */}
      <div className="ex-select-container glass">
        <label className="ex-select-label">Filtrar por categoria:</label>

        <select
          className="ex-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c} className="ex-option">
              {c.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* LISTA DE EXERCÍCIOS */}
      <div className="ex-list">
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
  );
}

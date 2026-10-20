
import { useEffect, useMemo, useState } from "react";
import { loadExercises } from "../services/exerciseService";
import type { Exercise } from "../services/exerciseService";

const CATEGORIES = [
  "Peito",
  "Ombros",
  "Trapézio",
  "Costas",
  "Bíceps",
  "Tríceps",
  "Antebraço",
  "Pernas",
  "Panturrilha",
  "Abdômen",
];

export function useExercises() {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [category, setCategory] = useState("Peito");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = CATEGORIES;

  useEffect(() => {
    let cancelled = false;

    async function fetchExercises() {
      try {
        setLoading(true);
        setError(null);

        const list = await loadExercises();

        if (!cancelled) {
          setAllExercises(list);
        }
      } catch (err) {
        console.error("Erro ao carregar exercícios:", err);

        if (!cancelled) {
          setAllExercises([]);
          setError(
            "Não foi possível carregar os exercícios. Verifica a ligação e tenta novamente."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchExercises();

    return () => {
      cancelled = true;
    };
  }, []);

  const exercises = useMemo(
    () => allExercises.filter((exercise) => exercise.category === category),
    [allExercises, category]
  );

  return {
    exercises,
    categories,
    category,
    setCategory,
    loading,
    error,
  };
}

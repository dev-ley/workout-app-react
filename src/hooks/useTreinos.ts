import { useEffect, useState } from "react";
import {
  loadTreino,
  removeExerciseFromTreino,
} from "../services/firebase";

export interface TreinoExercise {
  name: string;
  category: string;
  gif: string;
}

export function useTreinos(treino: "A" | "B" | "C", reload: number) {
  const [exercicios, setExercicios] = useState<TreinoExercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await loadTreino(treino);
      setExercicios(data);
      setLoading(false);
    }
    load();
  }, [treino, reload]);

  function saveLocal(ex: TreinoExercise, sets: string, reps: string, peso: string) {
    const key = `treino${treino}-${ex.name}`;
    localStorage.setItem(key, JSON.stringify({ sets, reps, peso }));
  }

  function loadLocal(ex: TreinoExercise) {
    const key = `treino${treino}-${ex.name}`;
    return JSON.parse(localStorage.getItem(key) || "{}");
  }

  async function removeExercise(ex: TreinoExercise) {
    const filtered = exercicios.filter((e) => e.name !== ex.name);

    await removeExerciseFromTreino(treino, filtered);

    const key = `treino${treino}-${ex.name}`;
    localStorage.removeItem(key);

    setExercicios(filtered);
  }

  return {
    exercicios,
    loading,
    saveLocal,
    loadLocal,
    removeExercise,
  };
}

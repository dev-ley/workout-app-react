import { useEffect, useState, useMemo } from "react";
import { loadExercises } from "../services/exerciseService";

type Exercise = {
  name: string;
  category: string;
  gif: string;
};

export function useExercises() {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [category, setCategory] = useState("Peito");
  const [loading, setLoading] = useState(true);

  const categories = useMemo(
    () => ["Peito", "Costas", "Pernas", "Ombros", "Biceps" ,"Tríceps"],
    []
  );

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const list = await loadExercises();
      setAllExercises(list);
      setLoading(false);
    }

    fetch();
  }, []);

  useEffect(() => {
    setExercises(allExercises.filter((ex) => ex.category === category));
  }, [category, allExercises]);

  return { exercises, categories, category, setCategory, loading };
}

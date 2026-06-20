import { useEffect, useState, useMemo } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface Exercise {
  name: string;
  category: string;
  gif: string;
}

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  // ===============================
  // CARREGAR EXERCÍCIOS DO FIRESTORE
  // ===============================
  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "exercises"));
      const list: Exercise[] = [];

      snap.forEach((doc) => list.push(doc.data() as Exercise));

      setExercises(list);
      setLoading(false);
    }

    load();
  }, []);

  // ===============================
  // CATEGORIAS ÚNICAS
  // ===============================
  const categories = useMemo(() => {
    const cats = [...new Set(exercises.map((ex) => ex.category))];
    return ["all", ...cats];
  }, [exercises]);

  // ===============================
  // FILTRAR EXERCÍCIOS
  // ===============================
  const filteredExercises = useMemo(() => {
    if (category === "all") return exercises;
    return exercises.filter((ex) => ex.category === category);
  }, [category, exercises]);

  return {
    exercises: filteredExercises,
    categories,
    category,
    setCategory,
    loading,
  };
}

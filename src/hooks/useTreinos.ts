import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuthContext } from "../context/AuthContext";

export type TreinoItem = {
  name: string;
  series: number;
  reps: number;
  peso?: number;
  gif?: string;
};

type TreinosState = {
  A: TreinoItem[];
  B: TreinoItem[];
  C: TreinoItem[];
};

export function useTreinos() {
  const { user } = useAuthContext();

  const [treinos, setTreinos] = useState<TreinosState>({
    A: [],
    B: [],
    C: [],
  });

  const [loaded, setLoaded] = useState(false);

  // ============================================================
  // 1. CARREGAR DO FIREBASE OU LOCALSTORAGE
  // ============================================================
  useEffect(() => {
    async function load() {
      if (!user) return;

      const ref = doc(db, "treinos", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data() as Partial<TreinosState>;
        setTreinos({
          A: data.A ?? [],
          B: data.B ?? [],
          C: data.C ?? [],
        });
      } else {
        const saved = localStorage.getItem("treinos");
        if (saved) {
          const parsed = JSON.parse(saved);
          setTreinos({
            A: parsed.A ?? [],
            B: parsed.B ?? [],
            C: parsed.C ?? [],
          });
        }
      }

      setLoaded(true);
    }

    load();
  }, [user]);

  // ============================================================
  // 2. SALVAR NO LOCALSTORAGE
  // ============================================================
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("treinos", JSON.stringify(treinos));
  }, [treinos, loaded]);

  // ============================================================
  // 3. SALVAR NO FIREBASE (SÓ DEPOIS DE CARREGAR)
  // ============================================================
  useEffect(() => {
    if (!loaded) return;
    if (!user) return;

    async function save() {
      const ref = doc(db, "treinos", user.uid);

      await setDoc(
        ref,
        {
          A: treinos.A ?? [],
          B: treinos.B ?? [],
          C: treinos.C ?? [],
        },
        { merge: true }
      );
    }

    save();
  }, [treinos, loaded, user]);

  // ============================================================
  // 4. ADICIONAR EXERCÍCIO
  // ============================================================
  function addExercise(treino: "A" | "B" | "C", exercise: TreinoItem) {
    setTreinos((prev) => ({
      ...prev,
      [treino]: [...prev[treino], exercise],
    }));
  }

  // ============================================================
  // 5. REMOVER EXERCÍCIO
  // ============================================================
  function removeExercise(treino: "A" | "B" | "C", index: number) {
    setTreinos((prev) => ({
      ...prev,
      [treino]: prev[treino].filter((_, i) => i !== index),
    }));
  }

  // ============================================================
  // 6. ATUALIZAR EXERCÍCIO
  // ============================================================
  function updateExercise(
    treino: "A" | "B" | "C",
    index: number,
    updated: TreinoItem
  ) {
    setTreinos((prev) => ({
      ...prev,
      [treino]: prev[treino].map((item, i) => (i === index ? updated : item)),
    }));
  }

  return { treinos, addExercise, removeExercise, updateExercise };
}

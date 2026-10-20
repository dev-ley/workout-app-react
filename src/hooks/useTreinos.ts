
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

const EMPTY_TREINOS: TreinosState = {
  A: [],
  B: [],
  C: [],
};

function normalizeTreinos(data: Partial<TreinosState> | null): TreinosState {
  return {
    A: Array.isArray(data?.A) ? data.A : [],
    B: Array.isArray(data?.B) ? data.B : [],
    C: Array.isArray(data?.C) ? data.C : [],
  };
}

function getStorageKey(userId: string) {
  return `treinos_${userId}`;
}

export function useTreinos() {
  const { user } = useAuthContext();
  const userId = user?.uid;

  const [treinos, setTreinos] = useState<TreinosState>(EMPTY_TREINOS);
  const [loaded, setLoaded] = useState(false);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1. Carregar os treinos do Firebase ou do armazenamento local.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoaded(false);
      setLoadedUserId(null);
      setError(null);

      if (!userId) {
        setTreinos(EMPTY_TREINOS);
        return;
      }

      try {
        const ref = doc(db, "treinos", userId);
        const snapshot = await getDoc(ref);

        let result: TreinosState;

        if (snapshot.exists()) {
          result = normalizeTreinos(
            snapshot.data() as Partial<TreinosState>
          );
        } else {
          const storageKey = getStorageKey(userId);
          const saved = localStorage.getItem(storageKey);

          if (saved) {
            result = normalizeTreinos(
              JSON.parse(saved) as Partial<TreinosState>
            );
          } else {
            // Migração dos dados antigos, guardados na chave global.
            const legacySaved = localStorage.getItem("treinos");

            if (legacySaved) {
              result = normalizeTreinos(
                JSON.parse(legacySaved) as Partial<TreinosState>
              );
            } else {
              result = EMPTY_TREINOS;
            }
          }
        }

        if (cancelled) return;

        setTreinos(result);
        setLoadedUserId(userId);
        setLoaded(true);
      } catch (err) {
        console.error("Erro ao carregar os treinos:", err);

        if (!cancelled) {
          setError(
            "Não foi possível carregar os treinos. Verifica a ligação e tenta novamente."
          );
          setLoaded(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // 2. Guardar localmente na chave específica do utilizador.
  useEffect(() => {
    if (!loaded || !userId || loadedUserId !== userId) return;

    try {
      localStorage.setItem(
        getStorageKey(userId),
        JSON.stringify(treinos)
      );
    } catch (err) {
      console.error("Erro ao guardar os treinos localmente:", err);
    }
  }, [treinos, loaded, loadedUserId, userId]);

  // 3. Guardar no Firebase apenas depois do carregamento.
  useEffect(() => {
    if (!loaded || !userId || loadedUserId !== userId) return;

    let cancelled = false;

    async function save() {
      try {
        const ref = doc(db, "treinos", userId);

        await setDoc(
          ref,
          {
            A: treinos.A,
            B: treinos.B,
            C: treinos.C,
          },
          { merge: true }
        );
      } catch (err) {
        if (!cancelled) {
          console.error("Erro ao guardar os treinos no Firebase:", err);
          setError("Não foi possível guardar os treinos no Firebase.");
        }
      }
    }

    void save();

    return () => {
      cancelled = true;
    };
  }, [treinos, loaded, loadedUserId, userId]);

  // 4. Adicionar exercício.
  function addExercise(treino: "A" | "B" | "C", exercise: TreinoItem) {
    setTreinos((prev) => ({
      ...prev,
      [treino]: [...prev[treino], exercise],
    }));
    setError(null);
  }

  // 5. Remover exercício.
  function removeExercise(treino: "A" | "B" | "C", index: number) {
    setTreinos((prev) => ({
      ...prev,
      [treino]: prev[treino].filter((_, i) => i !== index),
    }));
    setError(null);
  }

  // 6. Atualizar exercício.
  function updateExercise(
    treino: "A" | "B" | "C",
    index: number,
    updated: TreinoItem
  ) {
    setTreinos((prev) => ({
      ...prev,
      [treino]: prev[treino].map((item, i) =>
        i === index ? updated : item
      ),
    }));
    setError(null);
  }

  return {
    treinos,
    addExercise,
    removeExercise,
    updateExercise,
    loaded,
    error,
  };
}

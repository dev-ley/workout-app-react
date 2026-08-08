import { auth, db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export async function loadTreino(treino: "A" | "B" | "C") {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = doc(db, "users", user.uid, "treinos", `treino${treino}`);
  const snap = await getDoc(ref);

  if (!snap.exists()) return [];

  return snap.data().exercicios || [];
}

export async function addExerciseToTreino(
  treino: "A" | "B" | "C",
  exercise: any
) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "treinos", `treino${treino}`);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { exercicios: [] });
  }

  await updateDoc(ref, {
    exercicios: arrayUnion(exercise),
  });
}

export async function removeExerciseFromTreino(
  treino: "A" | "B" | "C",
  exercise: any
) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "treinos", `treino${treino}`);

  await updateDoc(ref, {
    exercicios: arrayRemove(exercise),
  });
}

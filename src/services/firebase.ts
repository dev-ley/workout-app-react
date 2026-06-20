import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// ===============================
// CONFIGURAÇÃO DO FIREBASE
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyAsf4cPId0cRoQDDbEtpLN3VABREpyKlyc",
  authDomain: "workout-app-e39a4.firebaseapp.com",
  projectId: "workout-app-e39a4",
  storageBucket: "workout-app-e39a4.firebasestorage.app",
  messagingSenderId: "187624655096",
  appId: "1:187624655096:web:ab1eec6d9f145e58bd130d",
  measurementId: "G-89LMC2B6EV",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Firestore com cache offline
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ===============================
// LOGIN GOOGLE
// ===============================
export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// ===============================
// LOGIN EMAIL / SENHA
// ===============================
export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// ===============================
// CARREGAR TREINO DO FIRESTORE
// ===============================
export async function loadTreino(treino: "A" | "B" | "C") {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = doc(db, "users", user.uid, "treinos", `treino${treino}`);
  const snap = await getDoc(ref);

  if (!snap.exists()) return [];

  return snap.data().exercicios || [];
}

// ===============================
// SALVAR EXERCÍCIO NO TREINO
// ===============================
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

// ===============================
// REMOVER EXERCÍCIO DO TREINO
// ===============================
export async function removeExerciseFromTreino(
  treino: "A" | "B" | "C",
  exercicios: any[]
) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "treinos", `treino${treino}`);

  await updateDoc(ref, { exercicios });
}

import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function loadExercises() {
  const snap = await getDocs(collection(db, "exercises"));
  const list: any[] = [];

  snap.forEach((doc) => list.push(doc.data()));

  return list;
}


import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export type Exercise = {
  name: string;
  category: string;
  gif: string;
};

export async function loadExercises(): Promise<Exercise[]> {
  const snapshot = await getDocs(collection(db, "exercises"));

  return snapshot.docs
    .map((document) => {
      const data = document.data();

      if (
        typeof data.name !== "string" ||
        typeof data.category !== "string"
      ) {
        return null;
      }

      return {
        name: data.name,
        category: data.category,
        gif: typeof data.gif === "string" ? data.gif : "",
      };
    })
    .filter((exercise): exercise is Exercise => exercise !== null);
}

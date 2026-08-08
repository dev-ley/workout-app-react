import "./Dashboard.css";

import { useState } from "react";
import { Header } from "../../components/layout/Header";
import { UserInfo } from "../../components/layout/UserInfo";

import { TreinoTabs } from "../../components/treino/TreinoTabs";
import { TreinoList } from "../../components/treino/TreinoList";

import { ExerciseModal } from "../../components/exercise/ExerciseModal";
import { GifModal } from "../../components/exercise/GifModal";
import { ChooseTreinoModal } from "../../components/exercise/ChooseTreinoModal";

import { useTreinos } from "../../hooks/useTreinos";

export default function Dashboard() {
  const [activeTreino, setActiveTreino] = useState<"A" | "B" | "C">("A");

  const { treinos, addExercise, removeExercise, updateExercise } = useTreinos();

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showGifModal, setShowGifModal] = useState(false);
  const [gifUrl, setGifUrl] = useState<string>("");

  const [exerciseToAdd, setExerciseToAdd] = useState<any | null>(null);
  const [showChooseTreinoModal, setShowChooseTreinoModal] = useState(false);

  function handleAddExercise(exercise: any) {
    setExerciseToAdd(exercise);
    setShowChooseTreinoModal(true);
  }

  function addToTreino(treino: "A" | "B" | "C") {
    if (!exerciseToAdd) return;

    addExercise(treino, {
      name: exerciseToAdd.name,
      series: 3,
      reps: 12,
      peso: 0,
      gif: exerciseToAdd.gif,
    });

    setShowChooseTreinoModal(false);
  }

  return (
    <div className="dashboard">
      <Header />
      <UserInfo />

      <TreinoTabs active={activeTreino} onChange={setActiveTreino} />

      <div className="dashboard-actions">
        <button
          className="open-exercise-btn"
          onClick={() => setShowExerciseModal(true)}
        >
          Adicionar Exercício
        </button>
      </div>

      <TreinoList
        treino={activeTreino}
        items={treinos[activeTreino]}
        removeExercise={removeExercise}
        updateExercise={updateExercise}
        onOpenGif={(url: string) => {
          setGifUrl(url);
          setShowGifModal(true);
        }}
      />

      {showExerciseModal && (
        <ExerciseModal
          onClose={() => setShowExerciseModal(false)}
          onSelectExercise={handleAddExercise}
          onOpenGif={(url: string) => {
            setGifUrl(url);
            setShowGifModal(true);
          }}
        />
      )}

      {showGifModal && (
        <GifModal url={gifUrl} onClose={() => setShowGifModal(false)} />
      )}

      {showChooseTreinoModal && (
        <ChooseTreinoModal
          exercise={exerciseToAdd}
          onClose={() => setShowChooseTreinoModal(false)}
          onAdded={addToTreino}
        />
      )}
    </div>
  );
}

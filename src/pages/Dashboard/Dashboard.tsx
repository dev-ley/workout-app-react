import { useState } from "react";
import "./Dashboard.css";

import { useAuth } from "../../hooks/useAuth";

import { Header } from "./components/Header";
import { UserInfo } from "./components/UserInfo";
import { TreinoTabs } from "./components/TreinoTabs";
import { TreinoList } from "./components/TreinoList";
import { ExerciseModal } from "./components/ExerciseModal";
import { GifModal } from "./components/GifModal";
import { ChooseTreinoModal } from "./components/ChooseTreinoModal";

export function Dashboard() {
  const { user, loading } = useAuth();

  const [activeTreino, setActiveTreino] = useState<"A" | "B" | "C">("A");

  const [reloadTreino, setReloadTreino] = useState(0);

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showGifModal, setShowGifModal] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);

  const [showChooseModal, setShowChooseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <main className="dashboard-page">

      <Header />

      <div className="dashboard">

        <UserInfo user={user} />

        <button
          className="new-treino"
          onClick={() => setShowExerciseModal(true)}
        >
          Lista de Exercícios
        </button>

        <TreinoTabs
          active={activeTreino}
          onChange={(t) => setActiveTreino(t)}
        />

        <TreinoList
          treino={activeTreino}
          reload={reloadTreino}
          onOpenGif={(url) => {
            setGifUrl(url);
            setShowGifModal(true);
          }}
        />
      </div>

      {showExerciseModal && (
        <ExerciseModal
          onClose={() => setShowExerciseModal(false)}
          onSelectExercise={(ex) => {
            setSelectedExercise(ex);
            setShowChooseModal(true);
          }}
          onOpenGif={(url) => {
            setGifUrl(url);
            setShowGifModal(true);
          }}
        />
      )}

      {showGifModal && gifUrl && (
        <GifModal
          url={gifUrl}
          onClose={() => {
            setGifUrl(null);
            setShowGifModal(false);
          }}
        />
      )}

      {showChooseModal && (
        <ChooseTreinoModal
          exercise={selectedExercise}
          onClose={() => setShowChooseModal(false)}
          onAdded={() => setReloadTreino(prev => prev + 1)}
        />
      )}

    </main>
  );
}

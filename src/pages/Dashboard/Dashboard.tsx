import "./Dashboard.css";
import { useState } from "react";

import { Header } from "../../components/layout/Header";
import { TreinoList } from "../../components/treino/TreinoList";

import { ExerciseModal } from "../../components/exercise/ExerciseModal";
import { GifModal } from "../../components/exercise/GifModal";
import { ChooseTreinoModal } from "../../components/exercise/ChooseTreinoModal";
import { ExerciciosPage } from "../../components/exercise/ExerciciosPage";

import { useTreinos } from "../../hooks/useTreinos";

import { getFCMToken } from "../../services/firebase";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    "treinos" | "exercicios" | "dieta" | "progresso"
  >("treinos");

  const [activeTreino, setActiveTreino] = useState<"A" | "B" | "C">("A");

  const { treinos, addExercise, removeExercise, updateExercise } = useTreinos();

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showGifModal, setShowGifModal] = useState(false);
  const [gifUrl, setGifUrl] = useState<string>("");

  const [exerciseToAdd, setExerciseToAdd] = useState<any | null>(null);
  const [showChooseTreinoModal, setShowChooseTreinoModal] = useState(false);

  // ==========================
  // ATIVAR NOTIFICAÇÕES
  // ==========================
  async function ativarNotificacoes() {
    try {
      const token = await getFCMToken();

      if (!token) {
        alert("Não foi possível gerar o token de notificações.");
        return;
      }

      await fetch("/api/salvar-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      alert("Notificações ativadas com sucesso!");
    } catch (err) {
      console.error("Erro ao ativar notificações:", err);
      alert("Erro ao ativar notificações.");
    }
  }

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
      <Header activeTab={activeTab} onChangeTab={setActiveTab} />

      <div className="dashboard-actions">
        <button className="notify-btn" onClick={ativarNotificacoes}>
          🔔 Ativar Notificações
        </button>
      </div>

      {activeTab === "treinos" && (
        <>
          <div className="treino-selector glass">
            {(["A", "B", "C"] as const).map((t) => (
              <button
                key={t}
                className={`treino-btn ${activeTreino === t ? "active" : ""}`}
                onClick={() => setActiveTreino(t)}
              >
                Treino {t}
              </button>
            ))}
          </div>

          <div className="dashboard-actions">
            <button
              className="open-exercise-btn"
              onClick={() => setShowExerciseModal(true)}
            >
              + Adicionar Exercício
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
        </>
      )}

      {activeTab === "exercicios" && (
        <ExerciciosPage
          onSelectExercise={handleAddExercise}
          onOpenGif={(url) => {
            setGifUrl(url);
            setShowGifModal(true);
          }}
        />
      )}

      {activeTab === "dieta" && (
        <div className="placeholder glass">
          <h2>🍎 Área de Dieta</h2>
          <p>Em breve você poderá montar sua dieta personalizada aqui.</p>
        </div>
      )}

      {activeTab === "progresso" && (
        <div className="placeholder glass">
          <h2>📈 Progresso</h2>
          <p>Acompanhe seus resultados e evolução física.</p>
        </div>
      )}

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

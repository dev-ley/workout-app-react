import "./TreinoCard.css";
import { useState } from "react";
import type { TreinoItem } from "../../hooks/useTreinos";
import { EditExerciseModal } from "./EditExerciseModal";

type TreinoCardProps = {
  item: TreinoItem;
  index: number;
  treino: "A" | "B" | "C";
  onUpdate: (treino: "A" | "B" | "C", index: number, updated: TreinoItem) => void;
  onRemove: () => void;
  onOpenGif: (gifUrl: string) => void;
};

export function TreinoCard({
  item,
  index,
  treino,
  onUpdate,
  onRemove,
  onOpenGif,
}: TreinoCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="treino-card glass">
        
        {/* LADO ESQUERDO */}
        <div className="treino-info">
          <h3>{item.name}</h3>
          <p>
            {item.series} séries • {item.reps} reps • {item.peso ?? 0} kg
          </p>
        </div>

        {/* LADO DIREITO — GIF + BOTÃO EDITAR */}
        <div className="treino-gif-container">
          {item.gif && (
            <img
              src={item.gif}
              alt={item.name}
              className="treino-gif"
              onClick={() => onOpenGif(item.gif!)}
            />
          )}

          <button className="edit-btn" onClick={() => setOpenModal(true)}>
            ✏️
          </button>
        </div>
      </div>

      {openModal && (
        <EditExerciseModal
          item={item}
          onClose={() => setOpenModal(false)}
          onSave={(updated) => {
            onUpdate(treino, index, updated);
            setOpenModal(false);
          }}
          onRemove={onRemove}
        />
      )}
    </>
  );
}

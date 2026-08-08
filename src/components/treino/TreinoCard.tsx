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
        <div className="treino-info">
          <h3>{item.name}</h3>
          <p>
            {item.series} séries • {item.reps} reps • {item.peso ?? 0} kg
          </p>
        </div>

        <div className="treino-actions">
          {item.gif && (
            <button className="gif-btn" onClick={() => onOpenGif(item.gif!)}>
              👀
            </button>
          )}

          <button className="edit-btn" onClick={() => setOpenModal(true)}>
            ✏️
          </button>

          <button className="remove-btn" onClick={onRemove}>
            ❌
          </button>

        </div>
      </div>

      {openModal && (
        <EditExerciseModal
          item={item}
          onClose={() => setOpenModal(false)}
          onSave={(updated) => {
            onUpdate(treino, index, updated);
            setOpenModal(false); // <-- FECHA O MODAL
          }}
        />
      )}
    </>
  );
}

import "./TreinoCard.css";
import { useEffect, useState } from "react";
import type { TreinoItem } from "../../hooks/useTreinos";
import { EditExerciseModal } from "./EditExerciseModal";

type TreinoCardProps = {
  item: TreinoItem;
  index: number;
  treino: "A" | "B" | "C";
  onUpdate: (
    treino: "A" | "B" | "C",
    index: number,
    updated: TreinoItem
  ) => void;
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

  const storageKey = `feito_${treino}_${item.name}_${index}`;
  const [feito, setFeito] = useState(
    () => localStorage.getItem(storageKey) === "true"
  );

  useEffect(() => {
    setFeito(localStorage.getItem(storageKey) === "true");
  }, [storageKey]);

  function toggleFeito() {
    setFeito((estadoAtual) => {
      const novoEstado = !estadoAtual;
      localStorage.setItem(storageKey, String(novoEstado));
      return novoEstado;
    });
  }

  return (
    <>
      <div className={`treino-card glass ${feito ? "feito" : ""}`}>
        <div className="treino-info">
          <h3 className={feito ? "feito-texto" : ""}>{item.name}</h3>

          <p className={feito ? "feito-texto" : ""}>
            {item.series} séries • {item.reps} reps • {item.peso ?? 0} kg
          </p>

          <input
            type="checkbox"
            className="feito-checkbox"
            checked={feito}
            onChange={toggleFeito}
            title="Marcar como feito"
            aria-label={`Marcar ${item.name} como feito no treino ${treino}`}
          />
        </div>

        <div className="treino-gif-container">
          {item.gif && (
            <img
              src={item.gif}
              alt={item.name}
              className="treino-gif"
              onClick={() => onOpenGif(item.gif!)}
            />
          )}

          <button
            type="button"
            className="edit-btn"
            onClick={() => setOpenModal(true)}
            aria-label={`Editar ${item.name}`}
          >
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
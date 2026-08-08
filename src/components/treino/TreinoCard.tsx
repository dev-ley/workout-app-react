import "./TreinoCard.css";
import { useEffect, useState } from "react";
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

  // chave única para cada exercício
  const storageKey = `feito_${treino}_${item.name}_${index}`;

  const [feito, setFeito] = useState(false);

  // carregar estado salvo
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "true") {
      setFeito(true);
    }
  }, []);

  // salvar estado sempre que mudar
  function toggleFeito() {
    const novoEstado = !feito;
    setFeito(novoEstado);
    localStorage.setItem(storageKey, String(novoEstado));
  }

  return (
    <>
      <div className={`treino-card glass ${feito ? "feito" : ""}`}>
        
        {/* LADO ESQUERDO */}
        <div className="treino-info">
          <h3 className={feito ? "feito-texto" : ""}>{item.name}</h3>
          <p className={feito ? "feito-texto" : ""}>
            {item.series} séries • {item.reps} reps • {item.peso ?? 0} kg
          </p>

          {/* CHECKBOX */}
          <input
            type="checkbox"
            className="feito-checkbox"
            checked={feito}
            onChange={toggleFeito}
            title="Marcar como feito"
          />
        </div>

        {/* GIF + EDITAR */}
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

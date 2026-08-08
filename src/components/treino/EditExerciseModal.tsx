import "./EditExerciseModal.css";
import { useState } from "react";
import type { TreinoItem } from "../../hooks/useTreinos";

type EditExerciseModalProps = {
  item: TreinoItem;
  onClose: () => void;
  onSave: (updated: TreinoItem) => void;
};

export function EditExerciseModal({ item, onClose, onSave }: EditExerciseModalProps) {
  const [localItem, setLocalItem] = useState<TreinoItem>(item);

  function handleSave() {
    onSave(localItem);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal glass" onClick={(e) => e.stopPropagation()}>
        <h2>Editar exercício</h2>

        <div className="modal-fields">
          <label>Séries</label>
          <input
            type="number"
            value={localItem.series}
            onChange={(e) =>
              setLocalItem({ ...localItem, series: Number(e.target.value) })
            }
          />

          <label>Repetições</label>
          <input
            type="number"
            value={localItem.reps}
            onChange={(e) =>
              setLocalItem({ ...localItem, reps: Number(e.target.value) })
            }
          />

          <label>Peso (kg)</label>
          <input
            type="number"
            value={localItem.peso ?? 0}
            onChange={(e) =>
              setLocalItem({ ...localItem, peso: Number(e.target.value) })
            }
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>

          <button className="save-btn" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

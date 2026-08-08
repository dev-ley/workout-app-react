import "./EditExerciseModal.css";
import { useState } from "react";
import type { TreinoItem } from "../../hooks/useTreinos";

type EditExerciseModalProps = {
  item: TreinoItem;
  onClose: () => void;
  onSave: (updated: TreinoItem) => void;
  onRemove: () => void;
};

export function EditExerciseModal({ item, onClose, onSave, onRemove }: EditExerciseModalProps) {
  const [localItem, setLocalItem] = useState({
    ...item,
    series: String(item.series),
    reps: String(item.reps),
    peso: item.peso ? String(item.peso) : "",
  });

  function handleSave() {
    onSave({
      name: item.name,
      series: Number(localItem.series || 0),
      reps: Number(localItem.reps || 0),
      peso: Number(localItem.peso || 0),
      gif: item.gif,
    });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Editar Exercício</h2>

        <div className="modal-fields">
          <label>Séries</label>
          <input
            type="number"
            value={localItem.series}
            onChange={(e) => setLocalItem({ ...localItem, series: e.target.value })}
          />

          <label>Repetições</label>
          <input
            type="number"
            value={localItem.reps}
            onChange={(e) => setLocalItem({ ...localItem, reps: e.target.value })}
          />

          <label>Peso (kg)</label>
          <input
            type="number"
            value={localItem.peso}
            onChange={(e) => setLocalItem({ ...localItem, peso: e.target.value })}
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="save-btn" onClick={handleSave}>Salvar</button>
          <button className="remove-btn" onClick={onRemove}>Remover Exercício</button>
        </div>
      </div>
    </div>
  );
}

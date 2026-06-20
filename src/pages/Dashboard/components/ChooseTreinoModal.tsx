import { addExerciseToTreino } from "../../../services/firebase";
import type { Exercise } from "../../../hooks/useExercises";

interface Props {
  exercise: Exercise;
  onClose: () => void;
  onAdded: () => void;
}

export function ChooseTreinoModal({ exercise, onClose, onAdded }: Props) {
  async function handleChoose(treino: "A" | "B" | "C") {
    await addExerciseToTreino(treino, exercise);
    onAdded();
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="choose-content">
        <h2>Adicionar ao Treino</h2>

        <p>{exercise.name}</p>

        <button className="choose-btn" onClick={() => handleChoose("A")}>
          Treino A
        </button>

        <button className="choose-btn" onClick={() => handleChoose("B")}>
          Treino B
        </button>

        <button className="choose-btn" onClick={() => handleChoose("C")}>
          Treino C
        </button>

        <button className="cancel-btn" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

import "./ChooseTreinoModal.css";

type ChooseTreinoModalProps = {
  exercise: {
    name: string;
    gif?: string;
    category?: string;
  };
  onClose: () => void;
  onAdded: (treino: "A" | "B" | "C") => void;
};

export function ChooseTreinoModal({
  exercise,
  onClose,
  onAdded,
}: ChooseTreinoModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal glass">

        <h2>Adicionar ao treino</h2>
        <p>{exercise?.name}</p>

        <div className="choose-buttons">
          {["A", "B", "C"].map((t) => (
            <button
              key={t}
              className="choose-btn"
              onClick={() => {
                onAdded(t as "A" | "B" | "C");
                onClose();
              }}
            >
              Treino {t}
            </button>
          ))}
        </div>

        <button className="close-btn" onClick={onClose}>Cancelar</button>

      </div>
    </div>
  );
}

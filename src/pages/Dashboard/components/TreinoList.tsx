import { useTreinos } from "../../../hooks/useTreinos";

interface Props {
  treino: "A" | "B" | "C";
  reload: number;
  onOpenGif: (url: string) => void;
}

export function TreinoList({ treino, reload, onOpenGif }: Props) {
  const { exercicios, loading, saveLocal, loadLocal, removeExercise } =
    useTreinos(treino, reload);

  if (loading) {
    return <p>Carregando treino...</p>;
  }

  if (exercicios.length === 0) {
    return <p>Nenhum exercício salvo no Treino {treino}.</p>;
  }

  return (
    <div id="treinoContainer">
      {exercicios.map((ex) => {
        const saved = loadLocal(ex);

        return (
          <div key={ex.name} className="treino-card">
            <img
              src={ex.gif}
              className="treino-gif"
              onClick={() => onOpenGif(ex.gif)}
            />

            <div className="treino-info">
              <h3>{ex.name}</h3>
              <p>{ex.category}</p>

              <div className="inputs">
                <div className="input-group">
                  <input
                    type="number"
                    min="1"
                    defaultValue={saved.sets || ""}
                    onBlur={(e) =>
                      saveLocal(ex, e.target.value, saved.reps, saved.peso)
                    }
                  />
                  <span className="suffix">x</span>
                </div>

                <div className="input-group">
                  <input
                    type="number"
                    min="1"
                    defaultValue={saved.reps || ""}
                    onBlur={(e) =>
                      saveLocal(ex, saved.sets, e.target.value, saved.peso)
                    }
                  />
                  <span className="suffix">x</span>
                </div>

                <div className="input-group">
                  <input
                    type="number"
                    min="1"
                    defaultValue={saved.peso || ""}
                    onBlur={(e) =>
                      saveLocal(ex, saved.sets, saved.reps, e.target.value)
                    }
                  />
                  <span className="suffix">kg</span>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeExercise(ex)}
              >
                ✖
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

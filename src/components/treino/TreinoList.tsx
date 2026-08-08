import { TreinoCard } from "./TreinoCard";
import type { TreinoItem } from "../../hooks/useTreinos";

type TreinoListProps = {
  treino: "A" | "B" | "C";
  items: TreinoItem[];
  removeExercise: (treino: "A" | "B" | "C", index: number) => void;
  updateExercise: (treino: "A" | "B" | "C", index: number, updated: TreinoItem) => void;
  onOpenGif: (gifUrl: string) => void;
};

export function TreinoList({
  treino,
  items,
  removeExercise,
  updateExercise,
  onOpenGif,
}: TreinoListProps) {
  const safeItems = items ?? [];

  return (
    <div>
      {safeItems.map((item, index) => (
        <TreinoCard
          key={index}
          item={item}
          index={index}
          treino={treino}
          onRemove={() => removeExercise(treino, index)}
          onUpdate={updateExercise}
          onOpenGif={onOpenGif}
        />
      ))}
    </div>
  );
}

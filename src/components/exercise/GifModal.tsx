
import "./GifModal.css";
import { useEffect } from "react";

type GifModalProps = {
  url: string;
  onClose: () => void;
};

export function GifModal({ url, onClose }: GifModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="gif-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="gif-modal-panel glass"
        role="dialog"
        aria-modal="true"
        aria-label="Visualização do exercício"
      >
        <header className="gif-modal-header">
          <div>
            <span className="gif-modal-eyebrow">DEMONSTRAÇÃO</span>
            <h2>Visualizar exercício</h2>
          </div>

          <button
            type="button"
            className="gif-modal-close"
            onClick={onClose}
            aria-label="Fechar visualização"
          >
            ×
          </button>
        </header>

        <div className="gif-modal-content">
          {url ? (
            <img
              src={url}
              className="gif-modal-img"
              alt="Demonstração do movimento do exercício"
            />
          ) : (
            <p className="gif-modal-empty">Imagem não disponível.</p>
          )}
        </div>

        <footer className="gif-modal-footer">
          <button
            type="button"
            className="gif-modal-close-button"
            onClick={onClose}
          >
            Fechar
          </button>
        </footer>
      </section>
    </div>
  );
}

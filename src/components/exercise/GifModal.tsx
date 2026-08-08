import "./GifModal.css";

type GifModalProps = {
  url: string;
  onClose: () => void;
};

export function GifModal({ url, onClose }: GifModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="gif-modal glass">
        <img src={url} className="gif-modal-img" />
        <button className="close-btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

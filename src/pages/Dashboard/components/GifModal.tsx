interface Props {
  url: string;
  onClose: () => void;
}

export function GifModal({ url, onClose }: Props) {
  return (
    <div className="gif-modal" onClick={onClose}>
      <button className="close-gif" onClick={onClose}>
        ✖
      </button>

      <img src={url} alt="Exercício" />
    </div>
  );
}

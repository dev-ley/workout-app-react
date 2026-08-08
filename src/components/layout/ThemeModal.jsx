import "./ThemeModal.css";

export function ThemeModal({ onClose }) {
  function handleColorChange(e) {
    const color = e.target.value;
    const root = document.documentElement;

    root.style.setProperty("--accent", color);
    root.style.setProperty("--accent-hover", color + "cc");
    root.style.setProperty(
      "--gradient-accent",
      `linear-gradient(135deg, ${color}, ${color}aa)`
    );
  }

  return (
    <div className="theme-modal-backdrop">
      <div className="theme-modal">
        <h2>Escolha a cor do tema</h2>

        <input
          type="color"
          className="theme-color-picker"
          onChange={handleColorChange}
        />

        <button className="close-theme-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

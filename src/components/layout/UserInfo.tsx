import "./UserInfo.css";
import { useAuthContext } from "../../context/AuthContext";

export function UserInfo() {
  const { user, logout } = useAuthContext();

  if (!user) {
    return null;
  }

  const photoURL = user.photoURL || "/images/icon-192.png";
  const displayName = user.displayName || "Utilizador";

  return (
    <div className="user-info glass">
      <img
        src={photoURL}
        alt={`Foto de perfil de ${displayName}`}
        className="avatar"
        referrerPolicy="no-referrer"
        onError={(event) => {
          const image = event.currentTarget;

          if (image.src.endsWith("/images/icon-192.png")) {
            return;
          }

          image.onerror = null;
          image.src = "/images/icon-192.png";
        }}
      />

      <div className="user-text">
        <h2>{displayName}</h2>
      </div>

      <button type="button" className="logout" onClick={logout}>
        Sair
      </button>
    </div>
  );
}
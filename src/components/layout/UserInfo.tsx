import "./UserInfo.css";
import { useAuthContext } from "../../context/AuthContext";

export function UserInfo() {
  const { user, logout } = useAuthContext();

  return (
    <div className="user-info glass">
      <img src={user.photoURL} className="avatar" />

      <div className="user-text">
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
      </div>

      <button className="logout" onClick={logout}>
        Sair
      </button>
    </div>
  );
}

import { auth } from "../../../services/firebase";
import { signOut } from "firebase/auth";

interface Props {
  user: any;
}

export function UserInfo({ user }: Props) {
  function handleLogout() {
    signOut(auth).then(() => {
      window.location.href = "/";
    });
  }

  return (
    <div className="user-info">
      <img src={user.photoURL} className="avatar" />
      <h2>{user.displayName}</h2>

      <button className="logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

import "./Login.css";
import { useAuthContext } from "../../context/AuthContext";

export default function Login() {
  const { loginWithGoogle } = useAuthContext();

  return (
    <div className="login-page">
      <div className="login-card glass">
        <h1 className="login-title">Workout App</h1>
        <p className="login-subtitle">Glassmorphism Edition</p>

        <button className="google-btn" onClick={loginWithGoogle}>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            className="google-icon"
          />
          Entrar com Google
        </button>
      </div>
    </div>
  );
}

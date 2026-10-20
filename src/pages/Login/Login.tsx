
import "./Login.css";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function Login() {
  const { loginWithGoogle } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle();
    } catch (err) {
      console.error("Erro ao entrar com Google:", err);
      setError("Não foi possível entrar. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />

      <section className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon" aria-hidden="true">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 18V30M14 13V35M34 13V35M40 18V30M14 24H34M4 21V27M44 21V27"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="login-brand-label">PERFORMANCE • DISCIPLINA</span>
        </div>

        <div className="login-heading">
          <span className="login-eyebrow">
            <span className="login-status-dot" />
            O TEU PRÓXIMO NÍVEL COMEÇA AQUI
          </span>

          <h1 className="login-title">
            App
            <br />
            <span>Workout</span>
          </h1>

          <p className="login-description">
            Cada treino conta. Entra na tua conta e continua a construir
            a tua melhor versão.
          </p>
        </div>

        <div className="login-divider">
          <span />
          <span className="login-divider-text">ACESSO À PLATAFORMA</span>
          <span />
        </div>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
        >
          {loading ? (
            <span className="login-spinner" aria-hidden="true" />
          ) : (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              className="google-icon"
              alt=""
            />
          )}

          <span>
            {loading ? "A entrar..." : "Continuar com Google"}
          </span>

          {!loading && (
            <span className="google-btn-arrow" aria-hidden="true">
              →
            </span>
          )}
        </button>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <div className="login-security">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 3L19 6V11C19 15.5 16 19 12 21C8 19 5 15.5 5 11V6L12 3Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Autenticação segura com Google</span>
        </div>

        <footer className="login-footer">
          <span>FOCO.</span>
          <span>CONSISTÊNCIA.</span>
          <span>EVOLUÇÃO.</span>
        </footer>
      </section>

      <p className="login-copyright">
        MEU GINÁSIO <span>©</span> {new Date().getFullYear()}
      </p>
    </main>
  );
}


import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import "../Login/Login.css";
import { useAuthContext } from "../../context/AuthContext";

function mensagemErro(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "Este email já está registado. Experimenta entrar.";

    case "auth/invalid-email":
      return "Introduz um endereço de email válido.";

    case "auth/weak-password":
      return "A palavra-passe é demasiado fraca. Usa pelo menos 6 caracteres.";

    case "auth/operation-not-allowed":
      return "O cadastro por email está desativado no Firebase.";

    case "auth/network-request-failed":
      return "Problema de ligação. Verifica a tua internet.";

    default:
      return "Não foi possível criar a conta. Tenta novamente.";
  }
}

export default function Cadastro() {
  const { registerWithEmail } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Introduz o teu nome.");
      return;
    }

    if (password.length < 6) {
      setError("A palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    setSubmitting(true);

    try {
      await registerWithEmail(name, email, password);
    } catch (err) {
      setError(mensagemErro(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="login-logo" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path
                d="M8 18V30M14 13V35M34 13V35M40 18V30M14 24H34"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="login-brand-name">WORKOUT</span>
        </div>

        <div className="login-content">
          <h1 className="login-title">Começa a tua evolução.</h1>

          <p className="login-subtitle">
            Cria a tua conta e prepara-te para o próximo nível.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="register-name">
            Nome
          </label>

          <input
            id="register-name"
            className="auth-input"
            type="text"
            autoComplete="name"
            placeholder="O teu nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={100}
            required
          />

          <label className="auth-label" htmlFor="register-email">
            Email
          </label>

          <input
            id="register-email"
            className="auth-input"
            type="email"
            autoComplete="email"
            placeholder="nome@exemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className="auth-label" htmlFor="register-password">
            Palavra-passe
          </label>

          <input
            id="register-password"
            className="auth-input"
            type="password"
            autoComplete="new-password"
            placeholder="Pelo menos 6 caracteres"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />

          <label className="auth-label" htmlFor="register-confirm-password">
            Confirmar palavra-passe
          </label>

          <input
            id="register-confirm-password"
            className="auth-input"
            type="password"
            autoComplete="new-password"
            placeholder="Repete a palavra-passe"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={6}
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "A criar conta..." : "Criar conta"}
          </button>
        </form>

        <p className="auth-switch">
          Já tens conta? <Link to="/">Entrar</Link>
        </p>

        <p className="login-footer">
          A tua jornada. O teu ritmo. A tua evolução.
        </p>
      </section>
    </main>
  );
}

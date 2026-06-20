import { useState, useEffect } from "react";
import "./Login.css";

import {
  loginWithGoogle,
  loginWithEmail,
  auth,
} from "../../services/firebase";

import { onAuthStateChanged } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Se já estiver logado → vai direto para o Dashboard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/dashboard";
      }
    });
    return () => unsub();
  }, []);

  async function handleEmailLogin(e: any) {
    e.preventDefault();
    setError("");

    try {
      await loginWithEmail(email, password);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError("Email ou senha incorretos");
    }
  }

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle();
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Erro ao entrar com Google");
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">

        <h1 className="login-title">💪 Meu Treino</h1>

        {error && <p className="login-error">{error}</p>}

        {/* LOGIN EMAIL/SENHA */}
        <form onSubmit={handleEmailLogin} className="login-form">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>

        <div className="divider">ou</div>

        {/* LOGIN GOOGLE */}
        <button className="google-btn" onClick={handleGoogleLogin}>
          Entrar com Google
        </button>
      </div>
    </div>
  );
}

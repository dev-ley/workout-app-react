import "./Header.css";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  const firstName = user?.displayName?.split(" ")[0] || "Usuário";

  function handleLogout() {
    const auth = getAuth();
    signOut(auth);
  }

  return (
    <header className="header">

      {/* PARTE SUPERIOR */}
      <div className="header-top">
        <div className="header-user">
          <img
            src={user?.photoURL || "/images/default-avatar.png"}
            alt={firstName}
            className="header-avatar"
          />
          <h1>Bem-vindo, {firstName}</h1>
        </div>

        {/* BOTÃO DE LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {/* BANNER */}
      <div className="header-banner">
        <div className="banner-text">
          <h2>Hora de Treinar!</h2>
          <p>Supere os seus limites.</p>
          <button className="btn-start">INICIAR TREINO</button>
        </div>

        <div className="banner-image"></div>
      </div>
    </header>
  );
}

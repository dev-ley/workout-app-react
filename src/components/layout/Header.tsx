import "./Header.css";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { MainNav } from "./MainNav";

type HeaderProps = {
  activeTab: "treinos" | "exercicios" | "dieta" | "progresso";
  onChangeTab: (tab: "treinos" | "exercicios" | "dieta" | "progresso") => void;
};

export function Header({ activeTab, onChangeTab }: HeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const firstName = user?.displayName?.split(" ")[0] || "Usuário";

  function handleLogout() {
    signOut(getAuth());
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
      </div>

      {/* NAVEGAÇÃO PRINCIPAL */}
      <MainNav active={activeTab} onChange={onChangeTab} />
    </header>
  );
}

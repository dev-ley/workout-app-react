import "./Header.css";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { MainNav } from "./MainNav";

type Tab = "treinos" | "exercicios" | "dieta" | "progresso";

type HeaderProps = {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
};

export function Header({ activeTab, onChangeTab }: HeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const firstName = user?.displayName?.split(" ")[0] || "Usuário";

  async function handleLogout() {
    try {
      await signOut(getAuth());
    } catch (error) {
      console.error("Erro ao terminar a sessão:", error);
    }
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-user">
          <img
            src={user?.photoURL || "/images/default-avatar.png"}
            alt={`Foto de perfil de ${firstName}`}
            className="header-avatar"
            referrerPolicy="no-referrer"
          />

          <div className="header-greeting">
            <span className="header-greeting-label">Bem-vindo</span>
            <h1>{firstName}</h1>
          </div>
        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Terminar sessão"
        >
          Sair
        </button>
      </div>

      <section className="header-banner" aria-label="Início do treino">
        <div className="banner-text">
          <h2>Hora de Treinar!</h2>
          <p>Supere os seus limites.</p>

          <button
            type="button"
            className="btn-start"
            onClick={() => onChangeTab("treinos")}
          >
            INICIAR TREINO
          </button>
        </div>
      </section>

      <MainNav active={activeTab} onChange={onChangeTab} />
    </header>
  );
}
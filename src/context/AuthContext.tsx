import { createContext, useContext, useEffect, useState } from "react";
import { auth, loginWithGoogle } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// ===============================
// TIPAGEM DO CONTEXTO
// ===============================
type AuthContextType = {
  user: any;
  loading: boolean;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
};

// O contexto começa como "undefined", não como null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===============================
// PROVIDER
// ===============================
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function logout() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ===============================
// HOOK
// ===============================
export function useAuthContext() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }

  return ctx;
}

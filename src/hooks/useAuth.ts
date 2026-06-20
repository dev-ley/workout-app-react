import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        // Se não estiver logado, volta para o login
        window.location.href = "/";
      } else {
        setUser(u);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { user, loading };
}

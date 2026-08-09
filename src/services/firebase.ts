import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

import { getMessaging, getToken } from "firebase/messaging";

// ===============================
// CONFIGURAÇÃO DO FIREBASE
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyAsf4cPId0cRoQDDbEtpLN3VABREpyKlyc",
  authDomain: "workout-app-e39a4.firebaseapp.com",
  projectId: "workout-app-e39a4",
  storageBucket: "workout-app-e39a4.firebasestorage.app",
  messagingSenderId: "187624655096",
  appId: "1:187624655096:web:ab1eec6d9f145e58bd130d",
  measurementId: "G-89LMC2B6EV",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Firestore com cache offline
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ===============================
// LOGIN GOOGLE
// ===============================
export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// ===============================
// LOGIN EMAIL / SENHA
// ===============================
export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// ===============================
// FIREBASE CLOUD MESSAGING (FCM)
// ===============================
export const messaging = getMessaging(app);

/**
 * Gera o token FCM do usuário usando a VAPID Public Key
 */
export async function getFCMToken() {
  try {
    // REGISTRA O SERVICE WORKER CORRETAMENTE
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey:
        "BMxMYhn69KjrxqX6Tn8vQgUO1E-1i78P-KQ3LSpA9svTPTrEIwFSHACsiqvtPMp29dAJ3Foqmqs68alXiRToWU8",
      serviceWorkerRegistration: registration,
    });

    console.log("Token FCM:", token);
    return token;
  } catch (err) {
    console.error("Erro ao gerar token FCM:", err);
    return null;
  }
}

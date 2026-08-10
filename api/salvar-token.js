import dotenv from "dotenv";
dotenv.config();


import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  const { token } = req.body;

  if (!token) return res.status(400).json({ error: "Token ausente" });

  try {
    await db.collection("tokens").doc(token).set({
      token,
      createdAt: new Date(),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erro ao salvar token:", err);
    return res.status(500).json({ error: "Erro ao salvar token" });
  }
}

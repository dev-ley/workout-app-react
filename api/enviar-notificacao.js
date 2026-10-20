
import "dotenv/config";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

function inicializarFirebaseAdmin() {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    throw new Error("Configuração do Firebase Admin incompleta.");
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { token, title, body } = req.body || {};

  if (!token || !title || !body) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    inicializarFirebaseAdmin();

    const messageId = await getMessaging().send({
      token,
      notification: { title, body },
    });

    return res.status(200).json({
      ok: true,
      messageId,
    });
  } catch (erro) {
    console.error("Erro ao enviar notificação:", erro);

    return res.status(500).json({
      error: "Erro ao enviar notificação",
    });
  }
}
